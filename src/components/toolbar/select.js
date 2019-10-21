import React, { Component } from 'react'
import { ReaderContext } from '@/context'

class Select extends Component {
  static contextType = ReaderContext

  constructor(props) {
    super(props)
  }

  handleClick = e => {
    this.context.toggleLang(e.target.value)
  }

  render() {
    const { options } = this.props
    return (
      <select onClick={this.handleClick}>
        {options.map(item => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
    )
  }
}

export default Select
