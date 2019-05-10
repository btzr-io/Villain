import React, { Component } from 'react'

class Toolbar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { id } = this.props
    return <div className={'villian-toolbar'} />
  }
}

export default Toolbar
