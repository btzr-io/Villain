import React from 'react'
import Icon from '@mdi/react'
import clsx from 'clsx'
import { Button } from 'reakit/Button'
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
        className={clsx(
          'button',
          typeClass && `button-${typeClass}`,
          active && 'button--active'
        )}
        {...otherButtonProps}
      >
        {icon && (
          <Icon path={icon} size={iconSize || '24px'} className={'villain-icon'} />
        )}
        {label && <span className={'villain-button-label'}>{label}</span>}
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

export default ToolbarButton
