import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Tooltip from './tooltip'

class Handle extends Component {
  state = {
    mouseOver: false,
  }

  onMouseEnter = () => {
    this.setState({ mouseOver: true })
  }

  onMouseLeave = () => {
    this.setState({ mouseOver: false })
  }

  render() {
    const {
      domain: [min, max],
      handle: { id, value, percent },
      isActive,
      disabled,
      getHandleProps,
    } = this.props

    const { mouseOver } = this.state

    return (
      <button
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        style={{
          height: 14,
          width: 14,
          left: `${percent}%`,
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          WebkitTapHighlightColor: 'rgba(0,0,0,0)',
          border: 0,
          borderRadius: '50%',
          backgroundColor: disabled ? 'transparent' : 'var(--slider-track-bg)',
          zIndex: 1,
        }}
        {...getHandleProps(id, {
          onMouseEnter: this.onMouseEnter,
          onMouseLeave: this.onMouseLeave,
        })}
      >
        {(mouseOver || isActive) && !disabled ? <Tooltip value={value} /> : null}
      </button>
    )
  }
}

Handle.propTypes = {
  domain: PropTypes.array.isRequired,
  handle: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  getHandleProps: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
}

export default React.memo(Handle)
