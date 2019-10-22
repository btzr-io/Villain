import React, { Component } from 'react'

class Tooltip extends Component {
  constructor(props) {
    super(props)
    this.clearDelay = null
  }

  state = { hover: false }

  onMouseEnter = e => {
    // Clear timeout
    window.clearTimeout(this.clearDelay)
    // Mouse button is not pressed
    if (e.buttons === 0) {
      // Delay to display tooltip
      this.clearDelay = setTimeout(() => {
        this.setState({ hover: true })
      }, 600)
    }
  }

  onMouseLeave = e => {
    // Clear timeout
    window.clearTimeout(this.clearDelay)
    // Mouse button is not pressed
    if (e.buttons === 0) {
      this.setState({ hover: false })
    }
  }

  handleKeyDown = () => {
    // Clear timeout
    window.clearTimeout(this.clearDelay)
    this.setState({ hover: false })
  }

  handleMouseUp = () => {
    // Clear timeout
    window.clearTimeout(this.clearDelay)
    this.setState({ hover: false })
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
    window.addEventListener('mouseup', this.handleMouseUp)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('mouseup', this.handleMouseUp)
  }

  render() {
    const { text, overrideClass, children, style } = this.props
    const className = `tooltip-con ${overrideClass || ''}`

    return (
      <div style={{ position: 'relative', ...style }}>
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
