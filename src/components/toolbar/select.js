import React, { Component } from 'react'
import { ReaderContext } from '@/context'
import Icon from '@mdi/react'

class WrapSelect extends Component {
  static contextType = ReaderContext

  constructor(props) {
    super(props)
  }

  render() {
    const { options, icon, value, onChange } = this.props
    return (
      <label>
        <Icon
          path={icon}
          size={'22px'}
          className={'villain-icon'}
          style={{ marginTop: '7px', marginRight: '6px' }}
        />
        <select
          value={value}
          onChange={onChange}
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
