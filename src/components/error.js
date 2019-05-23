import React, { Component } from 'react'
import Icon from '@mdi/react'
import { mdiChatAlert } from '@mdi/js'
class Error extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { id, message } = this.props
    return (
      <div className={'villain-overlay'}>
        <Icon className={'villain-icon'} path={mdiChatAlert} size={3} />
        <div>
          <h3>{message}</h3>
        </div>
      </div>
    )
  }
}

export default Error
