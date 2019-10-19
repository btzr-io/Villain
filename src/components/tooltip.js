import React, { Component } from 'react'

class Tooltip extends Component {
  constructor(props) {
    super(props)
  }

  state = { hover: false }

  onMouseEnter = () => {
    this.setState({ hover: true })
  }

  onMouseLeave = () => {
    this.setState({ hover: false })
  }

  render() {
    const { text, overrideClass, children } = this.props
    const className = `tooltip-con ${overrideClass || ''}`

    return (
      <div style={{ position: 'relative' }}>
        <div
          className={className}
          style={{ display: this.state.hover ? 'block' : 'none' }}
        >
          <span className="tooltip-text">{text}</span>
        </div>
        <div onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
          {children}
        </div>
      </div>
    )
  }
}

export default Tooltip
