import React, { Component } from 'react'

class Error extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { id } = this.props
    return (
      <div className={'villain-overlay'}>
        <div>Error!</div>
      </div>
    )
  }
}

export default Error
