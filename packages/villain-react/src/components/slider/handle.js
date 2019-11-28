import React, { memo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Button from '@/components/toolbar/button'
import { animated, useSpring } from 'react-spring'

const HandlerTooltip = memo(({ value, visible }) => {
  const [shouldRender, setShouldRender] = useState(false)

  const [tooltipAnimatedProps, updateTooltipSpring, stopTooltipSpring] = useSpring(
    () => ({
      delay: 0,
      opacity: 1,
      transform: 'scale(1)',
      config: { clamp: true, velocity: 14, friction: 20 },
    })
  )

  useEffect(() => {
    updateTooltipSpring({
      delay: visible ? 200 : 800,
      opacity: visible ? 1 : 0,
      onRest: () => {
        if (!visible) {
          setShouldRender(false)
        }
      },
      onStart: () => {
        if (visible) {
          setShouldRender(true)
        }
      },
      transform: `scale(${visible ? 1 : 0})`,
    })
  }, [visible])

  return (
    shouldRender && (
      <animated.div className="villain-tooltip--slider" style={tooltipAnimatedProps}>
        {value}
      </animated.div>
    )
  )
})

HandlerTooltip.propTypes = {
  value: PropTypes.number,
}

const Handle = ({
  domain: [min, max],
  handle: { id, value, percent },
  isActive,
  disabled,
  getHandleProps,
}) => {
  const [mouseOver, setMouseOver] = useState(false)

  const onMouseEnter = () => {
    setMouseOver(true)
  }

  const onMouseLeave = () => {
    setMouseOver(false)
  }

  const showTooltip = (mouseOver || isActive) && !disabled

  return (
    <Button
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      style={{
        height: 14,
        width: 14,
        left: `${percent}%`,
        display: 'block',
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        WebkitTapHighlightColor: 'rgba(0,0,0,0)',
        border: 0,
        borderRadius: '50%',
        backgroundColor: disabled ? 'transparent' : 'var(--slider-track-bg)',
        zIndex: 1,
        margin: 0,
        padding: 0,
        outline: 'none',
      }}
      {...getHandleProps(id, {
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave,
      })}
    >
      <HandlerTooltip value={value} visible={showTooltip} />
    </Button>
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

export default memo(Handle)
