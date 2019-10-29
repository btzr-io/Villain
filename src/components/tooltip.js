import React from 'react'

import {
  useTooltipState,
  Tooltip as ReakitTooltip,
  TooltipReference,
} from 'reakit/Tooltip'

const Tooltip = ({ style, title, children, placement = 'top', ...props }) => {
  const tooltip = useTooltipState({ placement })
  return (
    <>
      <TooltipReference {...tooltip}>
        {referenceProps =>
          React.cloneElement(React.Children.only(children), referenceProps)
        }
      </TooltipReference>
      <ReakitTooltip
        {...tooltip}
        {...props}
        style={style}
        className={`tooltip-villain`}
        unstable_portal={false}
      >
        {title}
      </ReakitTooltip>
    </>
  )
}

export default Tooltip
