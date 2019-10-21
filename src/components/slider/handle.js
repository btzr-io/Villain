import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Tooltip from '@/components/tooltip'

class Handle extends Component {
  render() {
    const {
      domain: [min, max],
      handle: { id, value, percent },
      isActive,
      disabled,
      getHandleProps,
    } = this.props

    return (
      <Tooltip
        text={value}
        style={{
          height: 32,
          left: `${percent}%`,
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <button
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          style={{
            WebkitTapHighlightColor: 'rgba(0,0,0,0)',
            zIndex: 300,
            border: 0,
            borderRadius: '50%',
            boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.2)',
            backgroundColor: disabled ? 'transparent' : '#fff',
            width: 14,
            height: 14,
            margin: '9px 0'
          }}
          {...getHandleProps(id)}
        />
      </Tooltip>
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

Handle.defaultProps = {
  disabled: false,
}

export default Handle
