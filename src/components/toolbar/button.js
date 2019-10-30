import React from 'react'
import Icon from '@mdi/react'
import clsx from 'clsx'
import { Button } from 'reakit/Button'
import Tooltip from '@/components/tooltip'

const ToolbarButton = ({
  icon,
  type,
  label,
  title,
  active,
  tooltip,
  onClick,
  children,
  disabled,
  tooltipPlacement,
  ...otherProps
}) => {
  const elem = (
    <span tabIndex={0} className={clsx('button-wrapper')}>
      <Button
        title={title}
        onClick={onClick}
        disabled={disabled}
        className={clsx('button', type && `button-${type}`, active && 'button--active')}
        {...otherProps}
      >
        {icon && <Icon path={icon} size={'26px'} className={'villain-icon'} />}
        {label && <span className={'villain-label'}>{label}</span>}
        {children && <span className={'villain-label'}>{children}</span>}
      </Button>
    </span>
  )

  return !tooltip ? (
    elem
  ) : (
    <Tooltip title={tooltip} placement={tooltipPlacement}>
      {elem}
    </Tooltip>
  )
}

export default ToolbarButton
