import React, { Component } from 'react'
import clsx from 'clsx'
import Villain from '@/index.js'
import { version } from '../package.json'
import './demo.css'

class Demo extends Component {
  state = {
    file: 'src/archives/example.zip',
    options: {
      preview: '',
      theme: { type: 'select', value: 'Light', options: ['Dark', 'Light'] },
      mangaMode: false,
      allowFullScreen: true,
      autoHideControls: false,
      allowGlobalShortcuts: false,
    },
  }

  constructor(props) {
    super(props)
  }

  handleChange = ({ target }) => {
    const { name, value } = parseEvent(target)
    this.setState({ [name]: value })
  }

  handleOptionsChange = ({ target }) => {
    const { options } = this.state
    let { name, value } = parseEvent(target)
    if (isObject(options[name])) value = { ...options[name], value }
    this.setState({ options: { ...options, [name]: value } })
  }

  optionsToFields() {
    const options = this.state.options
    return Object.entries(options).map(([key, value]) => {
      let type = 'text'
      if (isBoolean(value)) type = 'boolean'
      if (isObject(options[key]) && value.type) type = value.type
      return (
        <Field
          key={key}
          name={key}
          type={type}
          value={this.state.options[key]}
          onChange={this.handleOptionsChange}
          {...(isObject(options[key]) ? value : undefined)}
        />
      )
    })
  }

  optionsToProps() {
    return Object.entries(this.state.options).reduce((options, [key, value]) => {
      options[key] = isObject(value) ? value.value : value
      return options
    }, {})
  }

  render() {
    const options = this.optionsToProps()

    return (
      <div className="villain-demo" data-theme={options.theme}>
        <aside>
          <div className="form">
            <h3>Options</h3>
            <Field name="file" type="file" onChange={this.handleChange} />
            {this.optionsToFields()}
          </div>
        </aside>
        <div className="instance">
          <Villain
            file={this.state.file}
            options={options}
            workerUrl={'src/worker-bundle.js'}
          />
        </div>
      </div>
    )
  }
}

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

const isObject = value =>
  value && typeof value === 'object' && value.constructor === Object

const isBoolean = value => typeof value === 'boolean'

const parseEvent = target => {
  const name = target.name
  let value = target.value
  if (target.type === 'checkbox') value = target.checked
  else if (target.type === 'file') value = target.files[0]
  else if (!isNaN(Number(value))) value = value === '' ? '' : Number(value)
  return { name, value }
}

export default Demo
