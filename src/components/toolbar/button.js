import React from 'react'
import Icon from '@mdi/react'
import clsx from 'clsx'
import { Button } from 'reakit'
import Tooltip from '@/components/tooltip'

const ToolbarButton = React.forwardRef(
  (
    {
      icon,
      iconSize,
      label,
      title,
      active,
      tooltip,
      onClick,
      children,
      typeClass,
      tooltipPlacement,
      ...otherProps
    },
    ref
  ) => {
    const containerProps = { ref, ...otherProps }
    const otherButtonProps = !tooltip ? containerProps : {}

    let elem = (
      <Button
        focusable
        title={title}
        onClick={onClick}
        aria-label={tooltip}
        className={clsx(
          'villain-button',
          typeClass && `villain-button--${typeClass}`,
          active && 'villain-button--active'
        )}
        {...otherButtonProps}
      >
        {icon && (
          <Icon path={icon} size={iconSize || '24px'} className={'villain-icon'} />
        )}
        {label && <span className={'villain-button__label'}>{label}</span>}
        {children}
      </Button>
    )

    if (tooltip) {
      elem = (
        <Tooltip {...containerProps} title={tooltip} placement={tooltipPlacement}>
          {elem}
        </Tooltip>
      )
    }

    return elem
  }
)

export default React.memo(ToolbarButton)
