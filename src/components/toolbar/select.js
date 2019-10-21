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
      <>
        <label style={{ marginTop: '5px', marginRight: '5px' }}>
          <Icon path={icon} size={'22px'} className={'villain-icon'} />
        </label>
        <select onClick={this.handleClick}>
          {options.map(item => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </>
    )
  }
}

export default WrapSelect
