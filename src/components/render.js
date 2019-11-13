import clsx from 'clsx'
import React, { Component } from 'react'
import OpenSeaDragon from 'openseadragon'
import OSDConfig from '@/osd.config'
import Toolbar from '@/components/toolbar'
import RenderError from '@/components/renderError'
import Localize from '@/localize'
import { ReaderContext } from '../context'
import { getKeyByValue } from '@/lib/utils'
import { getNestedFocus } from '@/lib/use-focus'

import {
  onFullscreenChange,
  fullscreenElement,
  toggleFullscreen,
} from '@/lib/full-screen'

// Icons
import { mdiImageBrokenVariant } from '@mdi/js'

class CanvasRender extends Component {
  static defaultProps = {
    initialPage: 0,
  }

  static contextType = ReaderContext

  constructor(props) {
    super(props)
    this.viewer = null
    this.browser = null
    this.isScrolling = false
    this.clearScrollingDelay = null
  }

  getTargetZoom = (scale = 1) => {
    const { viewport, world } = this.viewer
    const count = world.getItemCount()
    return viewport.imageToViewportZoom(scale)
  }

  updateZoomLimits = () => {
    const { viewport } = this.viewer
    const targetZoom = 0.9
    const realTargetZoom = this.getTargetZoom()
    const imageBounds = this.viewer.world.getHomeBounds()
    const viewportBounds = viewport.getBounds()
    const imageAspect = imageBounds.width / imageBounds.height
    const viewportAspect = viewportBounds.width / viewportBounds.height
    const aspectFactor = imageAspect / viewportAspect
    const zoomFactor = (aspectFactor >= 1 ? 1 : aspectFactor) * targetZoom
    const zoom = zoomFactor / imageBounds.width
    const minZoom = realTargetZoom <= zoom ? realTargetZoom : zoom
    viewport.defaultZoomLevel = minZoom
    viewport.minZoomLevel = minZoom
    viewport.maxZoomLevel = realTargetZoom
  }

  updateZoom = (scale = 1) => {
    const { viewport } = this.viewer
    const max = this.getTargetZoom()
    const min = viewport.getMinZoom()

    let zoom = scale

    // Convert to int
    if (typeof zoom === 'string') {
      zoom = parseInt(zoom)
    }

    if (zoom) {
      // Prevent maz zoom
      if (zoom > 100) {
        zoom = 100
      }
      // Calculate zoom from user input
      zoom = (zoom / 100) * this.getTargetZoom()
      // Fix max
      if (zoom > max) {
        zoom = max
      }
      // Fix min
      if (zoom < min) {
        zoom = min
      }
      // Update
      viewport.zoomTo(zoom, null, true)
    }
  }

  zoomToOriginalSize = () => {
    const targetZoom = this.getTargetZoom()
    this.viewer.viewport.zoomTo(targetZoom, null, true)
  }

  handleFocus = () => {
    const { container } = this.props
    this.context.updateState({ focus: getNestedFocus(container) })
  }

  handleBlur = () => {
    this.context.updateState({ focus: false })
  }

  handleEnter = () => {
    const { autoHideControls } = this.context.state

    if (autoHideControls) {
      this.context.updateState({ hover: true })
    }
  }

  handleExit = () => {
    const { autoHideControls } = this.context.state

    if (autoHideControls) {
      this.context.updateState({ hover: false })
    }
  }

  handleError = error => {
    this.viewer.close()
    this.context.updateState({ renderError: true })
    // Debug error
    console.error(error)
  }

  handleFullscreenChange = () => {
    const fullscreen = fullscreenElement() !== null
    this.context.updateState({ fullscreen })
    this.updateZoomLimits()
  }

  handleZoom = ({ zoom }) => {
    const { viewport } = this.viewer
    const min = viewport.getMinZoom()
    const targetZoom = viewport.getMaxZoom()
    const currentZoom = parseInt((zoom / targetZoom) * 100)
    const canZoomIn = zoom < targetZoom && currentZoom < 100
    const canZoomOut = zoom > min
    this.context.updateState({ currentZoom, canZoomIn, canZoomOut })
  }

  handleZoomOptimized = event => {
    // Unable to update zoom on scroll inside this event handler:
    // - Bad peformance from multiple context update state calls
    // - Small delay for text updating noticeable.
    if (!this.isScrolling) {
      this.handleZoom(event)
    }
  }

  handleScrollOptimized = () => {
    // Reset scrolling flag
    this.isScrolling = true
    // Clear our timeout throughout the scroll
    window.clearTimeout(this.clearScrollingDelay)
    // Set a timeout to run after scrolling ends
    this.clearScrollingDelay = setTimeout(() => {
      this.isScrolling = false
      this.handleZoomOptimized({ zoom: this.viewer.viewport.getZoom() })
    }, 750)
  }

  toggleFullscreen = () => {
    const { container } = this.props
    const { allowFullScreen } = this.context.state
    if (allowFullScreen) toggleFullscreen(container)
  }

  initOpenSeaDragon() {
    const { id, container } = this.props
    const { pages } = this.context.state

    // Detect browser vendor
    this.browser = getKeyByValue(OpenSeaDragon.BROWSERS, OpenSeaDragon.Browser.vendor)

    // Create viewer
    this.viewer = OpenSeaDragon({ id, tileSources: pages[0], ...OSDConfig })

    // Events handler
    this.viewer.addHandler('open', () => {
      this.renderLayout()
      this.updateZoomLimits()
      this.viewer.viewport.zoomTo(this.viewer.viewport.getMinZoom(), null, true)
      this.context.updateState({ renderError: false })
    })

    // Events handler
    this.viewer.addHandler('resize', () => {
      this.updateZoomLimits()
    })

    // Fallback to improve peformance on firefox browser.
    // We should look into what other browsers should use this:
    if (this.browser === 'FIREFOX') {
      // Fix issue with animations and peformance, see:
      // https://github.com/btzr-io/Villain/issues/66
      this.viewer.addHandler('zoom', this.handleZoomOptimized)
      this.viewer.addHandler('canvas-scroll', this.handleScrollOptimized)
    } else {
      // This can run smooth on chromium based browsers (chrome, brave, electon)
      // But still needs more optimizations!
      this.viewer.addHandler('zoom', this.handleZoom)
    }

    this.viewer.addHandler('canvas-exit', this.handleExit)

    this.viewer.addHandler('canvas-enter', this.handleEnter)

    this.viewer.addHandler('open-failed', this.handleError)

    document.addEventListener('blur', this.handleBlur, true)

    document.addEventListener('focus', this.handleFocus, true)

    onFullscreenChange(container, 'add', this.handleFullscreenChange)
  }

  renderPage(index) {
    const page = this.context.getPage(index)
    page && this.viewer.open(page)
  }

  renderCover() {
    this.renderPage(0)
  }

  renderLayout() {
    const { viewport, world } = this.viewer
    const { currentPage } = this.context.state
    const pos = new OpenSeaDragon.Point(0, 0)
    const count = world.getItemCount()

    // Cache tile data
    let bounds = null
    let tiledImage = null
    let firstPageBounds = null

    for (let i = 0; i < count; i++) {
      // Get current page
      tiledImage = world.getItemAt(i)

      if (tiledImage) {
        // Get page bounds
        bounds = tiledImage.getBounds()
        // Get first page bounds
        if (i === 0) firstPageBounds = bounds
        // Auto resize pages to fit first page height
        else {
          tiledImage.setHeight(firstPageBounds.height, true)
        }
        // Recalculate bounds
        bounds = tiledImage.getBounds()
        // Position next page
        tiledImage.setPosition(pos, true)
        pos.x += bounds.width
      }
    }
    // Update viewer zoom
    this.fitPages()
  }

  fitPagesLegacy() {
    const { viewport, world } = this.viewer
    const bounds = world.getHomeBounds()
    viewport.fitBoundsWithConstraints(bounds, true)
  }

  fitPages(orientation) {
    const { viewport, world } = this.viewer

    if (!orientation) {
      this.fitPagesLegacy()
    }

    if (orientation === 'vertical') {
      viewport.fitVertically(true)
    }

    if (orientation === 'horizontal') {
      viewport.fitHorizontally(true)
    }
  }

  componentDidMount() {
    const { initialPage } = this.props
    this.initOpenSeaDragon()
    this.renderPage(initialPage)
  }

  componentWillUnmount() {
    const { container } = this.props
    // Remove event listeners
    document.removeEventListener('blur', this.handleBlur, true)
    document.removeEventListener('focus', this.handleFocus, true)
    onFullscreenChange(container, 'remove', this.handleFullscreenChange)
    // Destroy OpenSeaDragon viewer
    this.viewer.destroy()
    this.viewer = null
  }

  componentDidUpdate(prevProps) {
    const {
      bookMode,
      mangaMode,
      totalPages,
      currentPage,
      autoHideControls,
    } = this.props.contextState

    const prevContextState = prevProps.contextState

    // Page changed
    if (
      currentPage !== prevContextState.currentPage ||
      bookMode !== prevContextState.bookMode
    ) {
      // Render new valid page
      if (currentPage >= 0 && currentPage < totalPages) {
        this.renderPage(currentPage)
      }
    }

    // Page changed
    if (bookMode !== prevContextState.bookMode) {
      if (bookMode) {
        // Trigger re-render layout
        this.renderLayout()
      }
    }

    // re-render page when mangaMode is changed
    if (mangaMode !== prevContextState.mangaMode) {
      this.renderPage(currentPage)
    }
  }

  render() {
    const { id, container, renderError, contextState } = this.props
    const { focus, hover, autoHideControls } = contextState
    const showControls = !autoHideControls || hover || focus

    return (
      <React.Fragment>
        <Toolbar
          container={container}
          updateZoom={this.updateZoom}
          renderError={renderError}
          showControls={showControls}
          toggleFullscreen={this.toggleFullscreen}
        />
        <div id={id} className={'villain-canvas'} />
        {renderError && (
          <RenderError message={Localize['Invalid image']} icon={mdiImageBrokenVariant} />
        )}
      </React.Fragment>
    )
  }
}

export default CanvasRender
