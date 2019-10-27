import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Tooltip from './tooltip'

const railStyle = {
  position: 'absolute',
  margin: 0,
  width: '100%',
  height: '100%',
  cursor: 'pointer',
  zIndex: 300,
  borderRadius: '4px',
  backgroundColor: 'var(--slider-bg)',
  zIndex: -1,
}

class SliderRail extends Component {
  state = {
    value: null,
    percent: null,
  }

  static defaultProps = {
    disabled: false,
  }

  onMouseEnter = () => {
    document.addEventListener('mousemove', this.onMouseMove)
  }

  onMouseLeave = () => {
    this.setState({ value: null, percent: null })
    document.removeEventListener('mousemove', this.onMouseMove)
  }

  onMouseMove = e => {
    const { activeHandleID, getEventData } = this.props

    if (activeHandleID) {
      this.setState({ value: null, percent: null })
    } else {
      this.setState(getEventData(e))
    }
  }

  render() {
    const { value, percent } = this.state
    const { activeHandleID, getRailProps } = this.props

    return (
      <div
        style={railStyle}
        {...getRailProps({
          onMouseEnter: this.onMouseEnter,
          onMouseLeave: this.onMouseLeave,
        })}
      />
    )
  }
}

SliderRail.propTypes = {
  activeHandleID: PropTypes.string,
  getEventData: PropTypes.func.isRequired,
  getRailProps: PropTypes.func.isRequired,
}
export default SliderRail
