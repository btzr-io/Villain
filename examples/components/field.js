import React from 'react'
import clsx from 'clsx'
import Villain from '@/index.js'

function Field({ name, type = 'text', value, options = [], onChange }) {
  let input = <input {...{ name, type, value, onChange }} />
  if (type === 'boolean')
    input = (
      <input
        {...{ name, onChange }}
        type="checkbox"
        checked={value}
        className="custom-checkbox-input"
      />
    )
  else if (type === 'select')
    input = (
      <select {...{ name, value, onChange }}>
        {options.map(option => (
          <option key={option}>{option}</option>
        ))}
      </select>
    )
  return (
    <label className={clsx('field', type === 'checkbox' && 'checkbox')}>
      <span>{name}</span>
      {input}
    </label>
  )
}

export default Field
