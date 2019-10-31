import React, { useState, useContext, useEffect, useRef } from 'react'
import Button from './button'
import { ReaderContext } from '@/context'
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js'
import Localize from '@/localize'

const useFocus = () => {
  const htmlElRef = useRef(null)
  const setFocus = () => {
    if (htmlElRef.current) {
      htmlElRef.current.focus()
      htmlElRef.current.select()
    }
  }
  return [htmlElRef, setFocus]
}

const Navigation = () => {
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

  const checkLastPage = () => {
    return isLastPage ? null : Localize['Next page']
  }

  const checkFirstPage = () => {
    return isFirstPage ? null : Localize['Previous page']
  }

  return (
    <div className={'villain-toolbar-group'}>
      <Button
        typeClass={'icon'}
        icon={mdiChevronLeft}
        onClick={mangaMode ? navigateForward : navigateBackward}
        disabled={mangaMode ? isLastPage : isFirstPage}
        tooltip={mangaMode ? checkLastPage() : checkFirstPage()}
        tooltipPlacement={'top-start'}
      />
      <Button
        typeClass={'icon'}
        icon={mdiChevronRight}
        onClick={mangaMode ? navigateBackward : navigateForward}
        disabled={mangaMode ? isFirstPage : isLastPage}
        tooltip={mangaMode ? checkFirstPage() : checkLastPage()}
      />

      <div className={'wrapper-input'} data-focus={focusState} onClick={handleClick}>
        <input
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
        />
        <div className={'villain-label villain-label--center'}>{'/'}</div>
        <div className={'villain-label'}>{`${totalPages}`}</div>
      </div>
    </div>
  )
}

export default Navigation
