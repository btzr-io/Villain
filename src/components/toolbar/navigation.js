import React, { useState, useContext, useEffect, useRef } from 'react'
import Button from './button'
import { ReaderContext } from '@/context'
import { ToolbarItem } from 'reakit'

//Utils
import Localize from '@/localize'
import useFocus from '@/lib/use-focus'

// Icons
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js'

const Navigation = ({ toolbarItemProps }) => {
  const context = useContext(ReaderContext)
  const { totalPages, isFirstPage, isLastPage, mangaMode, currentPage } = context.state
  const { navigateForward, navigateBackward, navigateToPage } = context
  const [state, setState] = useState({ value: currentPage || 1 })
  const [focusState, setFocusState] = useState(false)
  const [inputRef, setInputFocus] = useFocus()

  useEffect(() => {
    resetInput()
  }, [currentPage])

  const resetInput = () => {
    setState({ value: currentPage + 1 })
  }

  const triggerNavigation = () => {
    const { value } = state

    if (value) {
      const num = parseInt(value, 10)
      if (num <= totalPages && num > 0) {
        // Valid index
        navigateToPage(num - 1)
      } else {
        // Reset input
        resetInput()
      }
    } else {
      // Reset input
      resetInput()
    }
  }

  const handlePageNumber = event => {
    const { value } = event.target
    const format = value.replace(/\..*|^0+/gm, '')

    if (format.length < 4) {
      setState({ value: value ? format : currentPage + 1 })
    }
  }

  const handleBlur = () => {
    triggerNavigation()
    setFocusState(false)
  }

  const handleFocus = () => {
    setFocusState(true)
  }

  const handleClick = e => {
    setInputFocus()
  }

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      triggerNavigation()
    }
  }

  return (
    <div className={'villain-toolbar-group'}>
      <ToolbarItem
        {...toolbarItemProps}
        typeClass={'icon'}
        icon={mdiChevronLeft}
        onClick={mangaMode ? navigateForward : navigateBackward}
        disabled={mangaMode ? isLastPage : isFirstPage}
        tooltip={mangaMode ? Localize['Next page'] : Localize['Previous page']}
        tooltipPlacement={'top-start'}
        as={Button}
        focusable
      />
      <ToolbarItem
        {...toolbarItemProps}
        typeClass={'icon'}
        icon={mdiChevronRight}
        onClick={mangaMode ? navigateBackward : navigateForward}
        disabled={mangaMode ? isFirstPage : isLastPage}
        tooltip={mangaMode ? Localize['Next page'] : Localize['Next page']}
        as={Button}
        focusable
      />

      <div className={'wrapper-input'} data-focus={focusState} onClick={handleClick}>
        <ToolbarItem
          {...toolbarItemProps}
          min={1}
          step={1}
          size={3}
          ref={inputRef}
          max={totalPages}
          type="number"
          aria-label="Go to page number"
          role="textbox"
          contentEditable="true"
          title="Page"
          pattern={'d+'}
          className={'villain-input'}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChange={handlePageNumber}
          onKeyPress={handleKeyPress}
          value={state.value}
          as={'input'}
          focusable
        />
        <div className={'villain-label villain-label--center'}>{'/'}</div>
        <div className={'villain-label'}>{`${totalPages}`}</div>
      </div>
    </div>
  )
}

export default Navigation
