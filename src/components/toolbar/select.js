import React, { Component } from 'react'
import { ReaderContext } from '@/context'
import Icon from '@mdi/react'

class WrapSelect extends Component {
  static contextType = ReaderContext

  constructor(props) {
    super(props)
  }

  handleClick = e => {
    this.context.toggleLang(e.target.value)
  }

  render() {
    const { options, icon } = this.props
    return (
      <label>
        <Icon
          path={icon}
          size={'22px'}
          className={'villain-icon'}
          style={{ marginTop: '7px', marginRight: '6px' }}
        />
        <select
          onClick={this.handleClick}
          style={{ position: 'relative', bottom: '6px' }}
        >
          {options.map(item => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
    )
  }
}

export default WrapSelect
