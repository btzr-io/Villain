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

    const tileSources = {
      type: 'image',
      url: 'https://bookofbadarguments.com/images/1.jpg',
      buildPyramid: false,
    }

    // Create viewer
    this.viewer = OpenSeaDragon({ id, tileSources, ...OSDConfig })

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

    for (let i = 0; i < count; i++) {
      const tiledImage = world.getItemAt(i)
      if (tiledImage) {
        const bounds = tiledImage.getBounds()
        tiledImage.setPosition(pos, true)
        pos.x += bounds.width
      }
    }

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
      if (currentPage >= 0 || currentPage < totalPages) {
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
