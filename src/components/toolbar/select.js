import React from 'react'
import Icon from '@mdi/react'

const WrapSelect = ({ options, icon, value, onChange, inputId, className, label }) =>
  <div className={`wrapselect-container ${className ? className : ''}`}>
    <label htmlFor={inputId}>
      <Icon
        path={icon}
        size={'22px'}
        className={'villain-icon'}
      />
    </label>
    <select
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

export default React.memo(WrapSelect)
