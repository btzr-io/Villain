import React, { Component } from 'react'
import { ReaderContext } from '../../context'

class Toolbar extends Component {
  static contextType = ReaderContext

  constructor(props) {
    super(props)
    this.state = {
      value: 1,
    }
  }

  resetInput = () => {
    const { currentPage } = this.context.state
    this.setState({ value: currentPage + 1 })
  }

  triggerNavigation = () => {
    const { value } = this.state
    const { totalPages } = this.context.state

    if (value) {
      const num = parseInt(value, 10)
      if (num <= totalPages && num > 0) {
        // Valid index
        this.context.navigateToPage(num - 1)
      } else {
        // Reset input
        this.resetInput()
      }
    } else {
      // Reset input
      this.resetInput()
    }
  }

  handlePageNumber = event => {
    const { value } = event.target
    const { currentPage } = this.context.state
    const format = value.replace(/\..*|^0+/gm, '')
    if (format.length < 5) {
      this.setState({ value: value ? format : currentPage + 1 })
    }
  }

  handleBlur = () => {
    this.triggerNavigation()
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.triggerNavigation()
    }
  }

  render() {
    const { id } = this.props
    const { navigateForward, navigateBackward, toggleSetting } = this.context
    const { currentPage, totalPages } = this.context.state
    return (
      <div className={'villain-toolbar'}>
        <button onClick={navigateBackward}>Previous page</button>
        <button onClick={navigateForward}>Next page</button>
        <button onClick={() => toggleSetting('bookMode')}>Book mode</button>
        <button onClick={() => toggleSetting('fullscreen')}>fullscreen</button>
        <input
          min={1}
          step={1}
          max={totalPages}
          type="number"
          title="Page"
          pattern={'d+'}
          className={'villain-input'}
          onBlur={this.handleBlur}
          onInput={this.handleInput}
          onChange={this.handlePageNumber}
          onKeyPress={this.handleKeyPress}
          value={this.state.value}
        />
        <div className={'villain-label'}>{` / ${totalPages}`}</div>
      </div>
    )
  }
}

export default Toolbar
