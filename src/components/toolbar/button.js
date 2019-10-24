import React from 'react'
import Icon from '@mdi/react'
import clsx from 'clsx'
import Tooltip from '@/components/tooltip'

const Button = ({
  type,
  onClick,
  icon,
  label,
  title,
  disabled,
  active,
  tooltip,
  tooltipClass,
  ariaLabel,
  children
}) => {
  const button = (
    <button
      role="button"
      aria-label={ariaLabel || title || tooltip}
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={clsx('button', type && `button-${type}`, active && 'button--active')}
    >
      {icon && <Icon path={icon} size={'26px'} className={'villain-icon'} />}
      {label && <span className={'villain-label'}>{label}</span>}
      {children && (
        <span className={'villain-label'}>{children}</span>
      )}
    </button>
  )

  return tooltip ? (
    <Tooltip text={tooltip} overrideClass={tooltipClass}>
      {button}
    </Tooltip>
  ) : (
    button
  )
}

export default React.memo(Button)
