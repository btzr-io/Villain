import React, { Component } from 'react'
import { ReaderContext } from '../context'
import clsx from 'clsx'

class Wrapp extends Component {
  static contextType = ReaderContext

  constructor(props) {
    super(props)
  }

  render() {
    const { fullscreen } = this.context.state
    return (
      <div className={clsx('villain', fullscreen && 'villain-fullscreen')}>
        {this.props.children}
      </div>
    )
  }
}

export default Wrapp
