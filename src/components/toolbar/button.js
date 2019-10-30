import React from 'react'
import Icon from '@mdi/react'
import clsx from 'clsx'
import { Button } from 'reakit/Button'
import Tooltip from '@/components/tooltip'

const ToolbarButton = React.forwardRef(({
  icon,
  label,
  title,
  active,
  tooltip,
  onClick,
  children,
  typeClass,
  tooltipPlacement,
  ...otherProps
}, ref) => {

  let elem = (
    <Button
      title={title}
      onClick={onClick}
      className={clsx('button', typeClass && `button-${typeClass}`, active && 'button--active')}
      {...otherProps}
      ref={ref}
      tabbable
    >
      {icon && <Icon path={icon} size={'24px'} className={'villain-icon'} />}
      {label && <span className={'villain-button-label'}>{label}</span>}
      {children}
    </Button>
  )

  if(tooltip) {
    elem = (
      <Tooltip title={tooltip} placement={tooltipPlacement}>
       {elem}
      </Tooltip>
    )
  }

  return elem;
})


export default ToolbarButton
