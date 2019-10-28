import React from 'react'
import {
  useTooltipState,
  Tooltip as ReakitTooltip,
  TooltipReference,
} from 'reakit/Tooltip'

const Tooltip = ({ text, children, overrideClass = '', style, ...props }) => {
  const tooltip = useTooltipState()
  return (
    <>
      <TooltipReference {...tooltip}>
        {referenceProps =>
          React.cloneElement(React.Children.only(children), referenceProps)
        }
      </TooltipReference>
      <ReakitTooltip {...tooltip} {...props} style={style} className={`tooltip`}>
        {text}
      </ReakitTooltip>
    </>
  )
}

export default React.memo(Tooltip)
