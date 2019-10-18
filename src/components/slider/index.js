import React, { Component } from 'react'
import { Slider, Rail, Handles, Tracks } from 'react-compound-slider'
import Handle from './handle'
import { ReaderContext } from '@/context'

const mainColor = '#FFF'

const sliderStyle = {
  position: 'absolute',
  width: '100%',
  height: 6,
  display: 'flex',
  alignItems: 'center',
  borderRadius: '4px',
  justifyContent: 'center',
  zIndex: 99,
}

const railStyle = {
  margin: 0,
  width: '100%',
  height: '100%',
  borderRadius: '4px',
  backgroundColor: 'var(--slider-bg)',
}

const Track = ({ source, target, getTrackProps }) => {
  return (
    <div
      className="slider-track"
      style={{
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      {...getTrackProps()}
    />
  )
}

const defaultValues = [1]

class SliderUI extends Component {
  static contextType = ReaderContext
  static defaultProps = {
    max: 1,
    onUpdate: update => {},
    bufferProgress: 0,
  }

  state = {
    values: defaultValues.slice(),
    seeking: false,
  }

  constructor(props) {
    super(props)
  }

  setValue = value => {
    this.setState({ values: [value] })
  }

  onUpdate = update => {
    // Start seeking
    this.setState({ seeking: true })
  }

  onChange = values => {
    this.props.onChange(values[0] - 1)
    // Stop seeking
    this.setState({ seeking: false })
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props
    if (value !== prevProps.value && !this.state.seeking) {
      this.setValue(value + 1)
    }
  }

  render() {
    const { max, bufferProgress } = this.props
    const domain = [1, max]
    const { values } = this.state

    if (max == 1) return null

    return (
      <div className={'villain-slider'} style={{ height: sliderStyle.height }}>
        <Slider
          rootStyle={sliderStyle}
          domain={domain}
          step={1}
          mode={2}
          values={values}
          onUpdate={this.onUpdate}
          onChange={this.onChange}
        >
          <Rail>
            {({ getRailProps }) => <div style={railStyle} {...getRailProps()} />}
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
                  />
                ))}
              </div>
            )}
          </Handles>

          <Tracks right={false}>
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
          style={{ width: `${bufferProgress}%`, borderRadius: '4px' }}
        />
      </div>
    )
  }
}

export default SliderUI
