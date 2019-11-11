import React, { useRef, useState, useEffect, useContext } from 'react'
import Button from './button'
import { ReaderContext } from '@/context'
import { ToolbarItem } from 'reakit'

// Uitls
import Localize from '@/localize'
import { useFocus } from '@/lib/use-focus'

// Icons
import { mdiPlus, mdiMinus } from '@mdi/js'

const ZoomControls = ({ disabled, onUpdate, toolbarItemProps }) => {
  // Context
  const context = useContext(ReaderContext)
  const { canZoomIn, canZoomOut, currentZoom } = context.state

  // State
  const [state, setState] = useState({ value: '' })
  const [focusState, setFocusState] = useState(false)

  // Ref
  const [inputRef, setInputFocus] = useFocus()

  useEffect(() => {
    resetInput()
  }, [currentZoom])

  const resetInput = () => {
    if (currentZoom) {
      setState({ value: currentZoom })
    }
  }

  const triggerUpdate = () => {
    if (state.value.length > 0) {
      onUpdate(state.value)
    } else {
      resetInput()
    }
  }

  const triggerIncrement = () => {
    const scale = currentZoom + 10
    onUpdate(scale)
  }

  const triggerDecrement = () => {
    const scale = currentZoom - 10
    onUpdate(scale)
  }

  const handleChange = event => {
    const { value } = event.target
    const format = value.replace(/\..*|^0+[\s]/gm, '')

    if (format.length < 4) {
      setState({ value: value ? format : currentZoom })
    }
  }

  const handleFocus = () => {
    setFocusState(true)
  }

  const handleBlur = () => {
    triggerUpdate()
    setFocusState(false)
  }

  const handleClick = () => {
    setInputFocus()
  }

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      triggerUpdate()
    }
  }

  return (
    <React.Fragment>
      <ToolbarItem
        {...toolbarItemProps}
        typeClass={'icon'}
        tooltip={Localize['Zoom in']}
        icon={mdiPlus}
        disabled={!canZoomIn || disabled}
        onClick={triggerIncrement}
        as={Button}
        focusable
      />
      <ToolbarItem
        {...toolbarItemProps}
        typeClass={'icon'}
        icon={mdiMinus}
        tooltip={Localize['Zoom out']}
        disabled={!canZoomOut || disabled}
        onClick={triggerDecrement}
        as={Button}
        focusable
      />

      {/* This wrapper is used to force an update for the initial value and when the zoom buttons trigger a change */}
      <div className={'wrapper-input'} data-focus={focusState} onClick={handleClick}>
        <ToolbarItem
          {...toolbarItemProps}
          step={1}
          size={3}
          pattern={'d+'}
          ref={inputRef}
          type={'number'}
          role={'textbox'}
          contentEditable="true"
          title="Zoom"
          aria-label="Zoom to percentage value"
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          className={'villain-input'}
          disabled={disabled}
          value={state.value}
          as={'input'}
          focusable
        />

        <div className={'villain-label villain-label--center'}>%</div>
      </div>
    </React.Fragment>
  )
}

export default ZoomControls
