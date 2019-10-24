import React, { Component } from 'react'
import clsx from 'clsx'
import Button from './button'
import { ReaderContext } from '@/context'
import { mdiPlus, mdiMinus } from '@mdi/js'
import Localize from '@/localize'

class ZoomControls extends Component {
  static contextType = ReaderContext

  constructor(props) {
    super(props)
    this.state = {
      zoom: 0,
      formatedZoom: '0%',
    }
  }

  triggerUpdate = () => {
    const { value } = this.state
    this.props.onUpdate(value)
  }

  triggerIncrement = () => {
    const { currentZoom } = this.props
    const scale = currentZoom + 10
    this.props.onUpdate(scale)
  }

  triggerDecrement = () => {
    const { currentZoom } = this.props
    const scale = currentZoom - 10
    this.props.onUpdate(scale)
  }

  handleChange = event => {
    const { value } = event.target
    const { currentZoom } = this.context.state

    if (value.length < 5) {
      this.setState({ value })
    }
  }

  handleBlur = () => {
    this.triggerUpdate()
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.triggerUpdate()
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { currentZoom } = props
    // Update zoom
    if (currentZoom && currentZoom !== state.zoom) {
      return {
        zoom: currentZoom,
        formatedZoom: `${currentZoom}%`,
      }
    }
    // Nothing to update
    return null
  }

  render() {
    const { disabled } = this.props
    const { canZoomIn, canZoomOut } = this.context.state

    return (
      <React.Fragment>
        <Button
          type={'icon'}
          tooltip={Localize['Zoom in']}
          icon={mdiPlus}
          disabled={!canZoomIn || disabled}
          onClick={this.triggerIncrement}
        />
        <Button
          type={'icon'}
          icon={mdiMinus}
          tooltip={Localize['Zoom out']}
          disabled={!canZoomOut || disabled}
          onClick={this.triggerDecrement}
        />
        {/* This wrapper is used to force an update for the initial value and when the zoom buttons trigger a change */}
        <div key={this.props.currentZoom}>
          <input
            type="number"
            title="Zoom"
            aria-label="Zoom to percentage value"
            role="textbox"
            contentEditable="true"
            defaultValue={this.props.currentZoom}
            onBlur={this.hanldeBlur}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            className={'villain-input'}
            disabled={disabled}
          />
        </div>
        <span>%</span>
      </React.Fragment>
    )
  }
}

export default ZoomControls
