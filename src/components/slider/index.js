import React, { useState, useEffect } from 'react'
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

const Track = ({ source, target, getTrackProps }) => {
  return (
    <div
      className="slider-track"
      style={{
        zIndex: 0,
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      {...getTrackProps()}
    />
  )
}

const defaultValues = [1]

const SliderUI = ({
  max = 1,
  bufferProgress = 0,
  reversed,
  onChange,
  value,
  toolbarItemProps,
}) => {
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
            <div className="slider-handles">
              {handles.map(handle => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  domain={domain}
                  isActive={handle.id === activeHandleID}
                  getHandleProps={getHandleProps}
                  toolbarItemProps={toolbarItemProps}
                />
              ))}
            </div>
          )}
        </Handles>

        <Tracks right={reversed} left={!reversed}>
          {({ tracks, getTrackProps }) => (
            <div className="slider-tracks">
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

      <div
        className={'buffer'}
        style={{
          width: `${bufferProgress}%`,
          borderRadius: '4px',
          right: reversed ? 0 : 'initial',
        }}
      />
    </div>
  )
}

export default React.memo(SliderUI)
