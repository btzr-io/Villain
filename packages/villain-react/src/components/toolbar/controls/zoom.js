import React, { memo, useRef, useState, useEffect } from 'react'
import Button from '@/components/toolbar/button'
import { ReaderContext } from '@/context'

// Uitls
import { useFocus } from '@/hooks/use-focus'

// Icons
import { mdiPlus, mdiMinus } from '@mdi/js'

const ZoomInButton = memo(({ zoomIn, disabled }) => {
  return (
    <ReaderContext.Consumer>
      {({ canZoomIn }) => (
        <Button
          typeClass={'icon'}
          tooltip={'Zoom in'}
          icon={mdiPlus}
          disabled={!canZoomIn || disabled}
          onClick={zoomIn}
          focusable
        />
      )}
    </ReaderContext.Consumer>
  )
})

const ZoomOutButton = memo(({ zoomOut, disabled }) => {
  return (
    <ReaderContext.Consumer>
      {({ canZoomOut }) => (
        <Button
          typeClass={'icon'}
          tooltip={'Zoom out'}
          icon={mdiMinus}
          disabled={!canZoomOut || disabled}
          onClick={zoomOut}
          focusable
        />
      )}
    </ReaderContext.Consumer>
  )
})

const ZoomInput = memo(({ onUpdate, currentZoom, disabled }) => {
  // State
  const [value, setValue] = useState('')
  const [focusState, setFocusState] = useState(false)

  // Ref
  const [inputRef, setInputFocus] = useFocus()

  useEffect(() => {
    resetInput()
  }, [currentZoom])

  const resetInput = () => {
    if (currentZoom) {
      setValue(currentZoom)
    }
  }

  const triggerUpdate = () => {
    if (inputRef.current.valueAsNumber) {
      onUpdate(inputRef.current.valueAsNumber)
    } else {
      resetInput()
    }
  }

  const handleChange = event => {
    setValue(event.target.value)
  }

  const handleFocus = () => {
    setFocusState(true)
    inputRef.current.select()
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
    <div
      className={'villain-wrapper-input'}
      data-focus={focusState}
      onClick={handleClick}
    >
      <input
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
        value={value}
      />

      <div className={'villain-label villain-label--center'}>%</div>
    </div>
  )
})

const ZoomControls = memo(({ zoomIn, zoomOut, onUpdate, disabled }) => {
  return (
    <div className={'villain-toolbar__group'}>
      <ZoomInButton zoomIn={zoomIn} disabled={disabled} />
      <ZoomOutButton zoomOut={zoomOut} disabled={disabled} />
      <ReaderContext.Consumer>
        {({ currentZoom }) => (
          <ZoomInput currentZoom={currentZoom} onUpdate={onUpdate} disabled={disabled} />
        )}
      </ReaderContext.Consumer>
    </div>
  )
})

export default ZoomControls
