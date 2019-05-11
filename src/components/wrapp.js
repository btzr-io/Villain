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
    const { fullscreen } = this.context.state
    const size = { width, height }
    console.info(size)
    return (
      <div className={clsx('villain', fullscreen && 'villain-fullscreen')} style={size}>
        {this.props.children}
      </div>
    )
  }
}

export default Wrapp
