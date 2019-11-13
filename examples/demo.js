import React, { useState } from 'react'
import clsx from 'clsx'
import Villain from '@/index.js'
import './demo.css'
import Field from './src/components/Field/field.js'
import { isObject, isBoolean, parseEvent } from './src/components/Others/others'

const Demo = () => {
  const [file, setFile] = useState('src/archives/example.zip')
  const [options, setOptions] = useState({
    preview: '',
    theme: { type: 'select', value: 'Light', options: ['Dark', 'Light'] },
    mangaMode: false,
    allowFullScreen: true,
    autoHideControls: false,
    allowGlobalShortcuts: false,
  })

  const handleChange = ({ target }) => {
    const { value } = parseEvent(target)
    setFile(value)
  }

  const handleOptionsChange = ({ target }) => {
    let { name, value } = parseEvent(target)
    if (isObject(options[name])) value = { ...options[name], value }
    setOptions({ ...options, [name]: value })
  }

  const optionsToFields = () => {
    return Object.entries(options).map(([key, value]) => {
      let type = 'text'
      if (isBoolean(value)) type = 'boolean'
      if (isObject(options[key]) && value.type) type = value.type
      return (
        <Field
          key={key}
          name={key}
          type={type}
          value={options[key]}
          onChange={handleOptionsChange}
          {...(isObject(options[key]) ? value : undefined)}
        />
      )
    })
  }

  const optionsToProps = () => {
    return Object.entries(options).reduce((accOptions, [key, value]) => {
      accOptions[key] = isObject(value) ? value.value : value
      return accOptions
    }, {})
  }

  const optionsProps = optionsToProps()
  return (
    <div className="villain-demo" data-theme={optionsProps.theme}>
      <aside>
        <div className="form">
          <h3>Options</h3>
          <Field name="file" type="file" onChange={handleChange} />
          {optionsToFields()}
        </div>
      </aside>
      <div className="instance">
        <Villain file={file} options={optionsProps} workerUrl={'src/worker-bundle.js'} />
      </div>
    </div>
  )
}

export default Demo
