import React, { useEffect, useState } from 'react'

import { useTooltipState, Tooltip as ReakitTooltip, TooltipReference } from 'reakit'

const Tooltip = React.forwardRef(
  ({ style, title, children, placement = 'top', ...props }, ref) => {
    const tooltipState = useTooltipState({ placement })

    // Update tooltip placement
    useEffect(() => {
      tooltipState.place(placement)
    }, [placement])

    return (
      <>
        <TooltipReference {...tooltipState} {...props} ref={ref}>
          {referenceProps =>
            React.cloneElement(React.Children.only(children), referenceProps)
          }
        </TooltipReference>
        <ReakitTooltip
          {...tooltipState}
          style={style}
          unstable_portal={false}
          className={'tooltip-villain'}
        >
          {title}
        </ReakitTooltip>
      </>
    )
  }
)

export default Tooltip
