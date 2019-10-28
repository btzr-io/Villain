import React, { useRef, useState, useEffect, useContext } from 'react'
import Button from './button'
import { ReaderContext } from '@/context'
import { mdiPlus, mdiMinus } from '@mdi/js'
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

const ZoomControls = ({ disabled, onUpdate }) => {
  // Context
  const context = useContext(ReaderContext)
  const { canZoomIn, canZoomOut, currentZoom } = context.state

  // State
  const [zoom, setZoom] = useState('0')
  const defaultMin = zoom
  const [focusState, setFocusState] = useState(false)

  // Ref
  const [inputRef, setInputFocus] = useFocus()

  useEffect(() => {
    resetInput()
  }, [currentZoom])

  const resetInput = () => {
    if (currentZoom) {
      setZoom(currentZoom)
    }
  }

  const triggerUpdate = () => {
    onUpdate(zoom)
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
    console.info(typeof value)
    const format = value.replace(/\..*|^0+/gm, '')
    if (format && format.length < 4) {
      setZoom(format)
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
      <Button
        type={'icon'}
        tooltip={Localize['Zoom in']}
        icon={mdiPlus}
        disabled={!canZoomIn || disabled}
        onClick={triggerIncrement}
      />
      <Button
        type={'icon'}
        icon={mdiMinus}
        tooltip={Localize['Zoom out']}
        disabled={!canZoomOut || disabled}
        onClick={triggerDecrement}
      />

      {/* This wrapper is used to force an update for the initial value and when the zoom buttons trigger a change */}
      <div className={'wrapper-input'} data-focus={focusState} onClick={handleClick}>
        <input
          min={0}
          step={1}
          size={3}
          max={100}
          ref={inputRef}
          type={'number'}
          value={zoom}
          title="Zoom"
          aria-label="Zoom to percentage value"
          contentEditable="true"
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          className={'villain-input'}
          disabled={disabled}
        />

        <div className={'villain-label villain-label--center'}>%</div>
      </div>
    </React.Fragment>
  )
}

export default ZoomControls
