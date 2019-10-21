import React, { Component } from 'react'
import Button from './button'
import { ReaderContext } from '@/context'
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js'
import messages from '@/locales/messages.json'

class Navigation extends Component {
  static contextType = ReaderContext

  constructor(props) {
    super(props)
    this.state = {
      value: this.props.currentPage || 1,
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

  componentDidUpdate(prevProps) {
    const { currentPage } = this.props
    if (currentPage !== prevProps.currentPage) {
      this.resetInput()
    }
  }

  render() {
    const { totalPages, isFirstPage, isLastPage, mangaMode } = this.context.state
    const { navigateForward, navigateBackward } = this.context

    return (
      <div className={'villain-toolbar-group'}>
        <Button
          type={'icon'}
          tooltip={mangaMode ? messages['pagination.next'] : messages['pagination.prev']}
          tooltipClass="left-edge"
          onClick={mangaMode ? navigateForward : navigateBackward}
          disabled={mangaMode ? isLastPage : isFirstPage}
          icon={mdiChevronLeft}
        />
        <Button
          type={'icon'}
          tooltip={mangaMode ? messages['pagination.next'] : messages['pagination.next']}
          onClick={mangaMode ? navigateBackward : navigateForward}
          disabled={mangaMode ? isFirstPage : isLastPage}
          icon={mdiChevronRight}
        />

        <input
          min={1}
          step={1}
          max={totalPages}
          type="number"
          title="Page"
          pattern={'d+'}
          className={'villain-input'}
          onBlur={this.handleBlur}
          onChange={this.handlePageNumber}
          onKeyPress={this.handleKeyPress}
          value={this.state.value}
        />
        <div className={'villain-label'}>{` of ${totalPages}`}</div>
      </div>
    )
  }
}

export default Navigation
