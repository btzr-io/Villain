import React, { useState, useEffect, memo } from 'react'
import { Slider, Rail, Handles, Tracks } from 'react-compound-slider'
import Handle from './handle'
import SliderRail from './sliderRail'

const mainColor = '#FFF'

const sliderStyle = {
  position: 'absolute',
  width: '100%',
  height: 4,
  display: 'flex',
  alignItems: 'center',
  borderRadius: '4px',
  justifyContent: 'center',
  zIndex: 99,
}

const Track = memo(({ source, target, getTrackProps }) => {
  return (
    <div
      className="villain-slider__track"
      style={{
        zIndex: 0,
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      {...getTrackProps()}
    />
  )
})

const BufferLoader = memo(({ bufferProgress, reversed }) => {
  return (
    <div
      className={'villain-slider__buffer'}
      style={{
        width: `${bufferProgress}%`,
        right: reversed ? 0 : 'initial',
      }}
    />
  )
})

const defaultValues = [1]

const SliderUI = memo(({ max = 1, bufferProgress = 0, reversed, onChange, value }) => {
  const [seeking, setSeeking] = useState(false)
  const [values, setValue] = useState(defaultValues.slice())

  const domain = [1, max]

  if (max == 1) return null

  const handleChange = values => {
    setSeeking(false)
    onChange(values[0] - 1)
  }

  useEffect(() => {
    if (!seeking) setValue([value + 1])
  }, [value])

  return (
    <div className="villain-slider" style={{ height: sliderStyle.height }}>
      <Slider
        rootStyle={sliderStyle}
        domain={domain}
        step={1}
        mode={2}
        values={values}
        onUpdate={() => setSeeking(true)}
        onChange={handleChange}
        reversed={reversed}
      >
        <Rail>
          {({ activeHandleID, getEventData, getRailProps }) => (
            <SliderRail
              activeHandleID={activeHandleID}
              getEventData={getEventData}
              getRailProps={getRailProps}
            />
          )}
        </Rail>

        <Handles>
          {({ handles, activeHandleID, getHandleProps }) => (
            <div className="villain-slider__handles">
              {handles.map(handle => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  domain={domain}
                  isActive={handle.id === activeHandleID}
                  getHandleProps={getHandleProps}
                />
              ))}
            </div>
          )}
        </Handles>

        <Tracks right={reversed} left={!reversed}>
          {({ tracks, getTrackProps }) => (
            <div className="villain-slider__tracks">
              {tracks.map(({ id, source, target }) => (
                <Track
                  key={id}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
                />
              ))}
            </div>
          )}
        </Tracks>
      </Slider>
      <BufferLoader bufferProgress={bufferProgress} reversed={reversed} />
    </div>
  )
})

export default SliderUI
