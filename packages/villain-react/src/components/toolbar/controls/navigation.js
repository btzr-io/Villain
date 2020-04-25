import React, { memo, useRef, useState, useEffect } from 'react'
import Button from '@/components/toolbar/button'
import { ReaderContext } from '@/context'

//Utils
import Localize from '@/localize'
import { useFocus } from '@/hooks/use-focus'

// Icons
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js'

const NavigationButton = memo(({ icon, action, disabled, tooltip }) => (
  <Button
    typeClass={'icon'}
    icon={icon}
    onClick={action}
    disabled={disabled}
    tooltip={tooltip}
    tooltipPlacement={'top-start'}
    focusable
  />
))

const NavigationInput = memo(({ totalPages, currentPage, navigateToPage }) => {
  const [state, setState] = useState({ value: currentPage || 1 })
  const [focusState, setFocusState] = useState(false)
  const [inputRef, setInputFocus] = useFocus()

  useEffect(() => {
    // Inital navigation:
    // This will check if there are more pages to navigate
    triggerNavigation()
  }, [])

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
    <div
      className={'villain-wrapper-input'}
      data-focus={focusState}
      onClick={handleClick}
    >
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
  )
})

const NavigationControls = () => {
  return (
    <div className={'villain-toolbar__group'}>
      <ReaderContext.Consumer>
        {({ mangaMode, navigateBackward, navigateForward, isFirstPage, isLastPage }) => (
          <>
            <NavigationButton
              icon={mdiChevronLeft}
              action={mangaMode ? navigateForward : navigateBackward}
              disabled={mangaMode ? isLastPage : isFirstPage}
              tooltip={mangaMode ? 'Next page' : 'Previous page'}
            />
            <NavigationButton
              icon={mdiChevronRight}
              action={mangaMode ? navigateBackward : navigateForward}
              disabled={mangaMode ? isFirstPage : isLastPage}
              tooltip={mangaMode ? 'Previous page' : 'Next page'}
            />
          </>
        )}
      </ReaderContext.Consumer>
      <ReaderContext.Consumer>
        {({ totalPages, currentPage, navigateToPage }) => (
          <NavigationInput
            totalPages={totalPages}
            currentPage={currentPage}
            navigateToPage={navigateToPage}
          />
        )}
      </ReaderContext.Consumer>
    </div>
  )
}

export default NavigationControls
