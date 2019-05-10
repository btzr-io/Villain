import React, { Component } from 'react'
import OpenSeaDragon from 'openseadragon'
import OSDConfig from '../osd.config'
import { ReaderContext } from '../context'

class CanvasRender extends Component {
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
      console.info('loaded!')
    })
    this.viewer.addHandler('close', () => {})
    this.viewer.addHandler('open-failed', e => {
      console.error(e)
    })
  }

  renderPage(index) {
    const page = this.context.getPage(index)
    this.viewer.open(page, 1)
  }

  renderCover() {
    this.renderPage(0)
  }

  componentDidMount() {
    this.initOpenSeaDragon()
    this.renderCover()
  }

  componentDidUpdate(prevProps) {
    // Render new page
    const { currentPage } = this.props

    if (currentPage !== prevProps.currentPage) {
      console.info(currentPage, prevProps.currentPage)
    }
  }

  render() {
    const { id } = this.props
    return <div id={id} className={'villian-canvas'} />
  }
}

export default CanvasRender
