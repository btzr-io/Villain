import React, { useState, useEffect, useContext } from 'react'
import Button from './button'
import { ReaderContext } from '@/context'
import { mdiPlus, mdiMinus } from '@mdi/js'
import Localize from '@/localize'

const ZoomControls = ({ disabled, onUpdate }) => {
  const [state, setState] = useState({
    zoom: 0,
    formatedZoom: '0%',
    value: 0,
  })

  const { canZoomIn, canZoomOut, currentZoom } = useContext(ReaderContext).state

  useEffect(() => {
    setState({
      zoom: currentZoom,
      formatedZoom: `${currentZoom}%`,
    })
  }, [currentZoom])

  const triggerUpdate = () => {
    onUpdate(state.value)
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

    if (value.length < 5) {
      setState({ ...state, value })
    }
  }

  const handleBlur = () => {
    triggerUpdate()
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
      <div key={currentZoom}>
        <input
          type="number"
          title="Zoom"
          aria-label="Zoom to percentage value"
          role="textbox"
          contentEditable="true"
          defaultValue={currentZoom}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          className={'villain-input'}
          disabled={disabled}
        />
      </div>

      <div className={'villain-label'}>%</div>
    </React.Fragment>
  )
}

export default ZoomControls
