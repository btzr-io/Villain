import React, { Component } from 'react'
import { ReaderContext } from '../../context'

class Toolbar extends Component {
  static contextType = ReaderContext

  constructor(props) {
    super(props)
  }

  render() {
    const { id } = this.props
    const { navigateForward, navigateBackward, toggleSetting } = this.context
    const { currentPage, totalPages } = this.context.state
    return (
      <div className={'villain-toolbar'}>
        <button onClick={navigateBackward}>Previous page</button>
        <div>{`${currentPage + 1} / ${totalPages}`}</div>
        <button onClick={navigateForward}>Next page</button>
        <button onClick={() => toggleSetting('bookMode')}>Book mode</button>
        <button onClick={() => toggleSetting('fullscreen')}>fullscreen</button>
      </div>
    )
  }
}

export default Toolbar
