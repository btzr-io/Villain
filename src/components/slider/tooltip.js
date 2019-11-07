import React from 'react'
import PropTypes from 'prop-types'

const Tooltip = ({ value = null }) => (
  <div className="tooltip-container">
    <div className="tooltip">
      <div className={'tooltip-text'}>{value}</div>
    </div>
  </div>
)

Tooltip.propTypes = {
  value: PropTypes.number,
}

export default Tooltip
