import React, { Component } from 'react'
import OpenSeaDragon from 'openseadragon'
import OSDConfig from '../osd.config'
import { ReaderContext } from '../context'

import Toolbar from './toolbar'

class CanvasRender extends Component {
  static defaultProps = {
    initialPage: 0,
  }

  static contextType = ReaderContext

  constructor(props) {
    super(props)
    this.viewer = null
  }

  getTargetZoom() {
    const { viewport, world } = this.viewer
    const page = world.getItemAt(0)
    const targetZoom = page
      ? page.source.dimensions.x / viewport.getContainerSize().x
      : 0.25
    return targetZoom
  }

  zoomToOriginalSize() {
    const targetZoom = this.getTargetZoom()
    this.viewer.viewport.zoomTo(targetZoom, null, true)
  }

  initOpenSeaDragon() {
    const { id } = this.props
    const { pages } = this.context.state

    // Create viewer
    this.viewer = OpenSeaDragon({ id, tileSources: pages[0], ...OSDConfig })

    // Events hanlder
    this.viewer.addHandler('open', () => {
      const { viewport, world } = this.viewer
      // Set Zoom options
      const targetZoom = this.getTargetZoom()
      viewport.maxZoomLevel = targetZoom
      this.renderBookModeLayout()
    })
    this.viewer.addHandler('close', () => {})
    this.viewer.addHandler('open-failed', e => {
      console.error(e)
    })
  }

  renderPage(index) {
    const page = this.context.getPage(index)
    page && this.viewer.open(page)
  }

  renderCover() {
    this.renderPage(0)
  }

  renderBookModeLayout() {
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
    this.fitPages(true)
  }

  fitPages(fast = false) {
    const { viewport, world } = this.viewer
    const count = world.getItemCount()
    const tiledImage = world.getItemAt(0)

    if (tiledImage) {
      const bounds = tiledImage.getBounds()
      const margin = 8 / viewport.getContainerSize().x
      bounds.width = (bounds.width + margin) * count
      viewport.fitBoundsWithConstraints(bounds, fast)
    }
  }

  componentDidMount() {
    const { initialPage } = this.props
    this.initOpenSeaDragon()
    this.renderPage(initialPage)
  }

  componentDidUpdate(prevProps) {
    const { totalPages } = this.context.state
    const { currentPage, bookMode } = this.props

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
        this.renderBookModeLayout()
      }
    }
  }

  render() {
    const { id } = this.props
    return (
      <React.Fragment>
        <Toolbar />
        <div id={id} className={'villain-canvas'} />
      </React.Fragment>
    )
  }
}

export default CanvasRender
