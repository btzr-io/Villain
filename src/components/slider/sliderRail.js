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
  return <div style={railStyle} {...getRailProps()} />
}

SliderRail.propTypes = {
  activeHandleID: PropTypes.string,
  getEventData: PropTypes.func.isRequired,
  getRailProps: PropTypes.func.isRequired,
}
export default SliderRail
