import React, { useEffect, useState } from 'react'
import Localized from '@/components/localized'
import { useTooltipState, Tooltip as ReakitTooltip, TooltipReference } from 'reakit'
import { animated, useSpring } from 'react-spring'

const Tooltip = React.forwardRef(
  ({ title, children, placement = 'top', ...props }, ref) => {
    const tooltipState = useTooltipState({ placement, unstable_animated: true })

    const handleAnimationRest = () => {
      tooltipState.unstable_stopAnimation()
    }

    const [{ opacity }, updateTooltipSpring, stopTooltipSpring] = useSpring(() => ({
      delay: 0,
      opacity: 0,
      onRest: handleAnimationRest,
      config: { clamp: true, velocity: 14, friction: 20 },
    }))

    // Update tooltip placement
    useEffect(() => {
      tooltipState.place(placement)
    }, [placement])

    useEffect(() => {
      updateTooltipSpring({
        delay: tooltipState.visible ? 400 : 0,
        opacity: tooltipState.visible ? 1 : 0,
      })
    }, [tooltipState.visible])

    return (
      <>
        <TooltipReference {...tooltipState} {...props} ref={ref}>
          {referenceProps =>
            React.cloneElement(React.Children.only(children), referenceProps)
          }
        </TooltipReference>
        <ReakitTooltip
          {...tooltipState}
          style={{ opacity }}
          unstable_portal={false}
          className={'villain-tooltip'}
          as={animated.div}
        >
          <Localized value={title} />
        </ReakitTooltip>
      </>
    )
  }
)

export default React.memo(Tooltip)
