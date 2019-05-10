import React, { Component } from 'react'
import { ReaderContext } from '../../context'

class Toolbar extends Component {
  static contextType = ReaderContext

  constructor(props) {
    super(props)
  }

  render() {
    const { id } = this.props
    const { navigateForward, navigateBackward } = this.context
    return (
      <div className={'villian-toolbar'}>
        <button onClick={navigateBackward}>Previous page</button>
        <button onClick={navigateForward}>Next page</button>
      </div>
    )
  }
}

export default Toolbar
