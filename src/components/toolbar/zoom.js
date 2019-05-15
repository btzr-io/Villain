import React, { Component } from 'react'
import clsx from 'clsx'
import Button from './button'
import { ReaderContext } from '../../context'
import { mdiPlus, mdiMinus } from '@mdi/js'

class ZoomControls extends Component {
  static contextType = ReaderContext

  constructor(props) {
    super(props)
    this.state = {
      value: '0%',
    }
  }

  triggerUpdate = () => {
    const { value } = this.state
    this.props.onUpdate(value)
  }

  triggerIncrement = () => {
    const { currentZoom } = this.props
    const scale = (currentZoom + 10) / 100
    this.props.onUpdate(scale)
  }

  triggerDecrement = () => {
    const { currentZoom } = this.props
    const scale = (currentZoom - 10) / 100
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

  componentDidUpdate(prevProps) {
    const { currentZoom } = this.props
    if (currentZoom !== prevProps.currentZoom) {
      this.setState({ value: `${currentZoom}%` })
    }
  }

  render() {
    const { currentZoom } = this.props
    const canZoomIn = currentZoom < 100
    const canZoomOut = currentZoom > 25
    return (
      <React.Fragment>
        <Button
          type={'icon'}
          title={'Zoom in'}
          icon={mdiPlus}
          disabled={!canZoomIn}
          onClick={this.triggerIncrement}
        />
        <Button
          type={'icon'}
          icon={mdiMinus}
          title={'Zoom out'}
          disabled={!canZoomOut}
          onClick={this.triggerDecrement}
        />
        <input
          type="text"
          title="Zoom"
          value={this.state.value}
          onBlur={this.hanldeBlur}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          className={'villain-input'}
        />
      </React.Fragment>
    )
  }
}

export default ZoomControls
