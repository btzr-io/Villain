import React, { Component } from 'react'

class Tooltip extends Component {
  constructor(props) {
    super(props)
    this.timeoutDisp = null
    this.timeoutHide = null
  }

  state = { hover: false }

  onMouseEnter = () => {
    // Clear timeout
    window.clearTimeout(this.timeoutDisp)
    // Delay to display tooltip
    this.timeoutDisp = setTimeout(() => {
      this.setState({ hover: true })
    }, 600)
  }

  onMouseLeave = () => {
    // Clear timeout
    window.clearTimeout(this.timeoutDisp)
    // Not hide tooltip when it will hide by timeout
    if (!this.timeoutHide) {
      this.setState({ hover: false })
    }
  }

  handleKeyDown = () => {
    // Clear timeout
    window.clearTimeout(this.timeoutDisp)
    this.setState({ hover: false })
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.text !== this.props.text) {
      // Clear timeout
      window.clearTimeout(this.timeoutHide)
      this.setState({ hover: true })
      this.timeoutHide = setTimeout(() => {
        this.setState({ hover: false })
        this.timeoutHide = null
      }, 1800)
    }
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
