import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import Tooltip from '@/components/tooltip'

class Handle extends PureComponent {
  render() {
    const {
      domain: [min, max],
      handle: { id, value, percent },
      isActive,
      disabled,
      getHandleProps,
    } = this.props

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
          boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.2)',
          backgroundColor: disabled ? 'transparent' : 'var(--slider-track-bg)',
          zIndex: 1,
        }}
        {...getHandleProps(id)}
      />
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
