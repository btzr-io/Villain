import React, { Component } from 'react'
import { ReaderContext } from '../context'
import clsx from 'clsx'

class Wrapp extends Component {
  static contextType = ReaderContext

  constructor(props) {
    super(props)
  }

  render() {
    const { width, height } = this.props
    const { fullscreen, autoHideControls } = this.context.state
    const size = { width, height }

    return (
      <div
        className={clsx(
          'villain',
          fullscreen && 'villain-fullscreen',
          !autoHideControls && 'villain--static'
        )}
        style={size}
      >
        {this.props.children}
      </div>
    )
  }
}

export default Wrapp
