import React from 'react'
import Icon from '@mdi/react'
import clsx from 'clsx'
import { Button } from "reakit/Button";

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
  ...otherProps
}) => {
  return (
    <Button
      title={tooltip || title}
      onClick={onClick}
      disabled={disabled}
      className={clsx('button', type && `button-${type}`, active && 'button--active')}
      {...otherProps}
    >
      {icon && <Icon path={icon} size={'26px'} className={'villain-icon'} />}
      {label && <span className={'villain-label'}>{label}</span>}
      {children && <span className={'villain-label'}>{children}</span>}
    </Button>
  )
}

export default React.memo(ToolbarButton)
