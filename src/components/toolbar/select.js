import React, { Component } from 'react'
import { ReaderContext } from '@/context'
import Icon from '@mdi/react'

class WrapSelect extends Component {
  static contextType = ReaderContext

  constructor(props) {
    super(props)
  }

  render() {
    const { options, icon, value, onChange, inputId, className, label } = this.props
    return (
      <div className={`wrapselect-container ${className ? className : ''}`}>
        <label htmlFor={inputId}>
          <Icon
            path={icon}
            size={'22px'}
            className={'villain-icon'}
          />
        </label>
        <select
          id={inputId}
          value={value}
          onChange={onChange}
          aria-label={label}
        >
          {options.map(item => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    )
  }
}

export default WrapSelect
