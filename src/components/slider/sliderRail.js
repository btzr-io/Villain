import React, { useState } from 'react'
import PropTypes from 'prop-types'

const railStyle = {
  position: 'absolute',
  margin: 0,
  width: '100%',
  height: '100%',
  cursor: 'pointer',
  borderRadius: '4px',
  backgroundColor: 'var(--slider-bg)',
  zIndex: -1,
}

const SliderRail = ({ activeHandleID, getEventData, getRailProps }) => {
  const [value, setValue] = useState(null)
  const [percent, setPercent] = useState(null)

  const onMouseEnter = () => {
    document.addEventListener('mousemove', onMouseMove)
  }

  const onMouseLeave = () => {
    setValue(null)
    setPercent(null)
    document.removeEventListener('mousemove', onMouseMove)
  }

  const onMouseMove = e => {
    if (activeHandleID) {
      setValue(null)
      setPercent(null)
    } else {
      setValue(getEventData(e).value)
      setPercent(getEventData(e).percent)
    }
  }

  return <div style={railStyle} {...getRailProps({ onMouseEnter, onMouseLeave })} />
}

SliderRail.propTypes = {
  activeHandleID: PropTypes.string,
  getEventData: PropTypes.func.isRequired,
  getRailProps: PropTypes.func.isRequired,
}
export default SliderRail
