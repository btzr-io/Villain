import React, { Component } from 'react'
import clsx from 'clsx'
import Villain from '@/index.js'
import {version} from '../package.json';
import './demo.css'

class Demo extends Component {

  state = {
    file: '/build/testFile/Example-archive.zip',
    width: '750px',
    height: '500px',
    options: {
      workerUrl: '/build/worker-bundle.js',
      theme: 'Light',
      preview: 0,
      mangaMode: false,
      allowFullScreen: true,
      autoHideControls: false,
      allowGlobalShortcuts: false,
    }
  }

  constructor(props) {
    super(props)
  }

  handleChange = ({target}, parent) => {
    const name = target.name
    let value = target.value
    if (target.type === 'checkbox') value = target.checked
    else if (target.type === 'file') value = target.files[0]
    else if (!isNaN(Number(value))) value = Number(value)
    if (parent)
      this.setState({[parent]: {...this.state[parent], [name]: value}})
    else
      this.setState({[name]: value})
  }

  parseOptions() {
    const options = this.state.options
    return Object.keys(options).map(key => {
      const value = options[key]
      const type = typeof value === 'boolean' ? "checkbox" : "text"
      return <Field 
        key={key}
        name={key}
        type={type}
        value={this.state.options[key]}
        onChange={event => this.handleChange(event, 'options')}
      />
    })
  }

  render() {
    return (
      <div className="villain-demo">
        <aside>
         <header>
            <img src="./logo.png" alt="logo" />
            <span>{version}</span>
          </header>
          <div className="form">
            <h3>Options</h3>
            <Field name="file" type="file" onChange={this.handleChange}/>
            <Field name="width" value={this.state.width} onChange={this.handleChange}/>
            <Field name="height" value={this.state.height} onChange={this.handleChange}/>
            {this.parseOptions()}
          </div>
        </aside>
        <div className="instance">
          <Villain {...this.state} />
        </div>
      </div>
    )
  }
}

function Field({name, type = 'text', value, onChange}) {
  return (
    <label className={clsx('field', type === 'checkbox' && 'checkbox')}>
      <span>{name}</span>
      {type === 'checkbox'
        ? <input {...{name, onChange}} type="checkbox" checked={value} />
        : <input {...{name, type, value, onChange}} />
      }
    </label>
  )
}

export default Demo