import React from 'react'
import PropTypes from 'prop-types'

const Tooltip = ({ value = null }) => (
  <div className="tooltip">
    <span className="tooltiptext">{value}</span>
  </div>
)

Tooltip.propTypes = {
  value: PropTypes.number,
}

export default Tooltip
