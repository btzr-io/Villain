import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

class Tooltip extends Component {
  static defaultProps = {
    value: null,
  }
  render() {
    const { value } = this.props

    return (
      <div className="tooltip">
        <span className="tooltiptext">Value: {value}</span>
      </div>
    )
  }
}

Tooltip.propTypes = {
  value: PropTypes.number,
}

export default Tooltip
