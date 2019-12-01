import React, { useState } from 'react'
import clsx from 'clsx'
import Villain from '@/index.js'
import Field from './components/field.js'

export const isObject = value =>
  value && typeof value === 'object' && value.constructor === Object

export const isBoolean = value => typeof value === 'boolean'

export const parseEvent = target => {
  const name = target.name
  let value = target.value
  if (target.type === 'checkbox') value = target.checked
  else if (target.type === 'file') value = target.files[0]
  else if (!isNaN(Number(value))) value = value === '' ? '' : Number(value)
  return { name, value }
}

const Demo = () => {
  const [file, setFile] = useState('static/archives/example.zip')
  const [options, setOptions] = useState({
    theme: { type: 'select', value: 'Light', options: ['Dark', 'Light'] },
    maxPages: 500,
    mangaMode: false,
    forceSort: false,
    allowFullScreen: true,
    autoHideControls: false,
    allowGlobalShortcuts: false,
  })

  const handleFileChange = ({ target }) => {
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
          <Field name="file" type="file" onChange={handleFileChange} />
          {optionsToFields()}
        </div>
      </aside>
      <div className="instance">
        <Villain
          source={file}
          options={optionsProps}
          workerUrl={'static/worker-bundle.js'}
        />
      </div>
    </div>
  )
}

export default Demo
