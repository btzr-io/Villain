import React from 'react'
import PropTypes from 'prop-types'

const Tooltip = ({ value = null }) => (
  <div className="villain-tooltip--slider">
    <div className="villain-tooltip--slider__container">
      <div className={'villain-tooltip--slider__text'}>{value}</div>
    </div>
  </div>
)

Tooltip.propTypes = {
  value: PropTypes.number,
}

export default Tooltip
