import React, { PureComponent } from 'react'
import Icon from '@mdi/react'
import clsx from 'clsx'
import Tooltip from '@/components/tooltip'

class Button extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const {
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
    } = this.props
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
        {this.props.children && (
          <span className={'villain-label'}>{this.props.children}</span>
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
}

export default Button
