import React, { Component } from 'react'

class Tooltip extends Component {
  constructor(props) {
    super(props)
    this.clearDelay = null
  }

  state = { hover: false }

  onMouseEnter = () => {
      // Clear timeout
      window.clearTimeout(this.clearDelay)
      // Delay to display tooltip
      this.clearDelay = setTimeout(() => {
        this.setState({ hover: true })
      },  600);
  }

  onMouseLeave = () => {
    // Clear timeout
    window.clearTimeout(this.clearDelay)
    this.setState({ hover: false })
  }

  handleKeyDown = () => {
    // Clear timeout
    window.clearTimeout(this.clearDelay)
    this.setState({ hover: false })
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
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
