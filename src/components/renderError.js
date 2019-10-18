import React, { Component } from 'react'
import Icon from '@mdi/react'
import { mdiImageBrokenVariant } from '@mdi/js'
class Error extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { id, message } = this.props
    return (
      <div className={'villain-overlay villain-overlay--canvas'}>
        <Icon className={'villain-icon'} path={mdiImageBrokenVariant} size={4} />
        <div>
          <h3>{message}</h3>
        </div>
      </div>
    )
  }
}

export default Error
