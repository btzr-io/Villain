import React from 'react'

const Loader = ({ id }) =>
  <div className="villain-overlay" id={id}>
    <div className="villain-loader-indicator" />
  </div>

export default Loader
