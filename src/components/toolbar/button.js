import React, { Component } from 'react'
import Icon from '@mdi/react'
import clsx from 'clsx'

class Button extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { type, onClick, icon, label, title, disabled, toggle } = this.props
    return (
      <button
        title={title}
        onClick={onClick}
        disabled={disabled}
        className={clsx('button', type && `button-${type}`, toggle && 'button-toggle')}
      >
        {icon && <Icon path={icon} size={0.92} className={'villain-icon'} />}
        {label && <span className={'villain-label'}>{label}</span>}
        {this.props.children && (
          <span className={'villain-label'}>{this.props.children}</span>
        )}
      </button>
    )
  }
}

export default Button
