import clsx from 'clsx'
import React from 'react'
import OpenSeaDragon from 'openseadragon'
import OSDConfig from '@/osd.config'
import RenderError from '@/components/renderError'
import ToolbarConsumer from '@/components/toolbar'
import { ReaderContext } from '../context'
import { getKeyByValue, debounce } from '@/lib/utils'
import { getNestedFocus } from '@/hooks/use-focus'
import { memoizeZoomClamp, memoizeZoomPercent } from '@/lib/zoom-parser'
import { fullscreenElement, onFullscreenChange } from '@/lib/full-screen'

// Icons
import { mdiImageBrokenVariant } from '@mdi/js'

class CanvasRender extends React.Component {
  static defaultProps = {
    initialPage: 0,
  }

  constructor(props) {
    super(props)
    this.viewer = null
    this.browser = null
    this.isScrolling = false
    this.OSDContainer = React.createRef()
    this.clearScrollingDelay = null
  }

  // Get the max target zoom
  getTargetZoom = (scale = 1) => {
    let zooms = []
    const { viewport, world } = this.viewer
    const count = world.getItemCount()

    for (let i = 0; i < count; i++) {
      zooms[i] = world.getItemAt(i).imageToViewportZoom(scale)
    }

    return Math.max(zooms) || zooms[0]
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
    const max = viewport.getMaxZoom()
    const min = viewport.getMinZoom()

    if (scale) {
      // Clamp zoom value
      let zoom = memoizeZoomClamp(scale, max, min)
      // Update
      viewport.zoomTo(zoom, true)
      viewport.ensureVisible(true)
    }
  }

  zoomIn = () => {
    const { viewport } = this.viewer
    const max = viewport.getMaxZoom()
    const zoom = viewport.getZoom()
    const currentZoom = memoizeZoomPercent(zoom, max)
    this.updateZoom(currentZoom + 10)
  }

  zoomOut = () => {
    const { viewport } = this.viewer
    const max = viewport.getMaxZoom()
    const zoom = viewport.getZoom()
    const currentZoom = memoizeZoomPercent(zoom, max)
    this.updateZoom(currentZoom - 10)
  }

  zoomToOriginalSize = () => {
    const targetZoom = this.getTargetZoom()
    this.viewer.viewport.zoomTo(targetZoom, null, true)
  }

  handleError = error => {
    const { updateCotextState } = this.props
    this.viewer.close()
    updateContextState({ renderError: true })
    // Debug error
    console.error(error)
  }

  handleFullscreenChange = () => {
    const { updateContextState } = this.props
    const fullscreen = fullscreenElement() !== null
    updateContextState({ fullscreen })
    this.updateZoomLimits()
  }

  handleZoom = ({ zoom }) => {
    const { viewport } = this.viewer
    const { updateContextState } = this.props
    const min = viewport.getMinZoom()
    const max = viewport.getMaxZoom()
    const currentZoom = memoizeZoomPercent(zoom, max)
    const canZoomIn = zoom < max && currentZoom < 100
    const canZoomOut = zoom > min
    updateContextState({ currentZoom, canZoomIn, canZoomOut })
  }

  handleZoomOptimized = debounce(event => {
    // Unable to update zoom on scroll inside this event handler:
    // - Bad peformance from multiple context update state calls
    // - Small delay for text updating noticeable.
    if (!this.isScrolling) {
      this.handleZoom(event)
    }
  }, 200)

  handleScrollOptimized = () => {
    // Reset scrolling flag
    this.isScrolling = true
    // Clear our timeout throughout the scroll
    window.clearTimeout(this.clearScrollingDelay)
    // Set a timeout to run after scrolling ends
    this.clearScrollingDelay = setTimeout(() => {
      this.isScrolling = false
      this.handleZoomOptimized({ zoom: this.viewer.viewport.getZoom() })
    }, 400)
  }

  initOpenSeaDragon = () => {
    const { id, container, pages, renderError, updateContextState } = this.props

    // Detect browser vendor
    this.browser = getKeyByValue(OpenSeaDragon.BROWSERS, OpenSeaDragon.Browser.vendor)

    // Create viewer
    this.viewer = OpenSeaDragon({
      element: this.OSDContainer.current,
      tileSources: pages[0],
      ...OSDConfig,
    })

    // Events handler
    this.viewer.addHandler('open', () => {
      this.renderLayout()
      this.fitBounds()

      // Prevent unessesart context updates
      if (renderError) {
        updateContextState({ renderError: false })
      }
    })

    // Events handler
    this.viewer.addHandler('resize', () => {
      this.updateZoomLimits()
    })

    // Fallback to improve peformance on zoom upodates"
    // Fix issue with animations and peformance, see:
    // https://github.com/btzr-io/Villain/issues/66
    this.viewer.addHandler('zoom', this.handleZoomOptimized)
    // Optimized scroll event
    this.viewer.addHandler('canvas-scroll', this.handleScrollOptimized)

    this.viewer.addHandler('open-failed', this.handleError)

    onFullscreenChange(container, 'add', this.handleFullscreenChange)
  }

  renderPage(index) {
    const page = this.props.getPage(index)
    page && this.viewer.open(page)
  }

  renderCover() {
    this.renderPage(0)
  }

  fitBounds() {
    const { viewport } = this.viewer
    this.fitPages()
    this.updateZoomLimits()
    viewport.zoomTo(viewport.getMinZoom(), null, true)
  }

  renderLayout() {
    const { world } = this.viewer
    const { mangaMode, bookMode } = this.props
    const pos = new OpenSeaDragon.Point(0, 0)
    const count = world.getItemCount()

    // Cache tile data
    let bounds = null
    // first page
    let firstPage = null
    let firstPageIndex = bookMode && mangaMode && count > 1 ? 1 : 0
    let firstPageBounds = null
    // Next page
    let nextPage = null
    let nextPageBounds = null
    let nextPageIndex = bookMode && mangaMode ? 0 : 1

    if (count > 0) {
      // Page view (single page)
      firstPage = world.getItemAt(firstPageIndex)
      firstPageBounds = firstPage.getBounds()

      // Book view ( two pages )
      if (count > 1) {
        nextPage = world.getItemAt(nextPageIndex)
        nextPageBounds = nextPage.getBounds()

        // Auto resize page to fit first page height
        if (firstPageBounds.height > nextPageBounds.height) {
          nextPage.setHeight(firstPageBounds.height, true)
          // Recalculate bounds
          nextPageBounds = nextPage.getBounds()
        }

        // Auto resize page to fit next page height
        if (nextPageBounds.height > firstPageBounds.height) {
          firstPage.setHeight(nextPageBounds.height, true)
          // Recalculate bounds
          firstPageBounds = firstPage.getBounds()
        }
      }

      // Set position for first page
      if (firstPage && firstPageBounds) {
        firstPage.setPosition(pos, true)
        pos.x += firstPageBounds.width
      }

      // Set position for next page
      if (nextPage && nextPageBounds) {
        nextPage.setPosition(pos, true)
        pos.x += nextPageBounds.width
      }
    }
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
    onFullscreenChange(container, 'remove', this.handleFullscreenChange)
    // Destroy OpenSeaDragon viewer
    this.viewer.destroy()
    this.viewer = null
  }

  componentDidUpdate(prevProps) {
    const { bookMode, mangaMode, totalPages, currentPage } = this.props

    // Page changed
    if (currentPage !== prevProps.currentPage || bookMode !== prevProps.bookMode) {
      // Render new valid page
      if (currentPage >= 0 && currentPage < totalPages) {
        this.renderPage(currentPage)
      }
    }

    // Page changed
    if (bookMode !== prevProps.bookMode) {
      if (bookMode) {
        // Trigger re-render layout
        this.renderLayout()
        this.fitBounds()
      }
    }

    // Re-render layout when mangaMode and there and book mode is active
    if (mangaMode !== prevProps.mangaMode && bookMode) {
      this.renderLayout()
    }
  }

  render() {
    const { id, container, renderError } = this.props

    return (
      <React.Fragment>
        <ToolbarConsumer
          container={container}
          updateZoom={this.updateZoom}
          zoomIn={this.zoomIn}
          zoomOut={this.zoomOut}
        />
        <div ref={this.OSDContainer} className={'villain-canvas'} />
        {renderError && (
          <RenderError message={'Invalid image'} icon={mdiImageBrokenVariant} />
        )}
      </React.Fragment>
    )
  }
}

const CanvasRenderConsumer = React.memo(({ container }) => {
  return (
    <ReaderContext.Consumer>
      {({
        // State
        ready,
        error,
        hover,
        pages,
        bookMode,
        mangaMode,
        totalPages,
        currentPage,
        renderError,
        allowFullScreen,
        allowGlobalShortcuts,
        // Actions
        getPage,
        updateState,
      }) => {
        const shouldRender = ready && !error

        return (
          shouldRender && (
            <CanvasRender
              hover={hover}
              pages={pages}
              container={container}
              currentPage={currentPage}
              getPage={getPage}
              bookMode={bookMode}
              mangaMode={mangaMode}
              totalPages={totalPages}
              renderError={renderError}
              allowFullScreen={allowFullScreen}
              allowGlobalShortcuts={allowGlobalShortcuts}
              updateContextState={updateState}
            />
          )
        )
      }}
    </ReaderContext.Consumer>
  )
})

export default CanvasRenderConsumer
