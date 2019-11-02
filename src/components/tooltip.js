import React from 'react'

import {
  useTooltipState,
  Tooltip as ReakitTooltip,
  TooltipReference,
} from 'reakit/Tooltip'

const Tooltip = React.forwardRef(
  ({ style, title, children, placement = 'top', ...props }, ref) => {
    const tooltip = useTooltipState({ placement })
    return (
      <>
        <TooltipReference {...tooltip} {...props} ref={ref}>
          {referenceProps =>
            React.cloneElement(React.Children.only(children), referenceProps)
          }
        </TooltipReference>
        <ReakitTooltip
          {...tooltip}
          style={style}
          className={`tooltip-villain`}
          unstable_portal={false}
        >
          {title}
        </ReakitTooltip>
      </>
    )
  }
)

export default Tooltip
