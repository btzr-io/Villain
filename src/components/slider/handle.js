import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Tooltip from './tooltip'
import { ToolbarItem } from 'reakit'

const Handle = ({
  domain: [min, max],
  handle: { id, value, percent },
  isActive,
  disabled,
  getHandleProps,
  toolbarItemProps,
}) => {
  const [mouseOver, setMouseOver] = useState(false)

  const onMouseEnter = () => {
    setMouseOver(true)
  }

  const onMouseLeave = () => {
    setMouseOver(false)
  }

  return (
    <ToolbarItem
      {...toolbarItemProps}
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
        margin: 0,
        padding: 0,
      }}
      {...getHandleProps(id, {
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave,
      })}
      as={'button'}
    >
      {(mouseOver || isActive) && !disabled ? <Tooltip value={value} /> : null}
    </ToolbarItem>
  )
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
