import React, { Component } from 'react'

class Loader extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { id } = this.props
    return (
      <div className={'villain-overlay'}>
        <div className={'villain-loader-indicator'} />
      </div>
    )
  }
}

export default Loader
