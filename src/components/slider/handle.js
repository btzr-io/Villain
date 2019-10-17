import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

const handleStyle = {
  position: 'absolute',
  marginLeft: '-11px',
  marginTop: '-35px',
}

class Handle extends Component {
  state = {
    mouseOver: false,
  }

  onMouseEnter = () => {
    this.setState({ mouseOver: true })
  }

  onMouseLeave = () => {
    this.setState({ mouseOver: false })
  }

  render() {
    const {
      domain: [min, max],
      handle: { id, value, percent },
      isActive,
      disabled,
      getHandleProps,
    } = this.props
    const { mouseOver } = this.state

    return (
      <Fragment>
        {(mouseOver || isActive) && !disabled ? (
          <div
            style={{
              left: `${percent}%`,
              ...handleStyle,
            }}
          >
            <div className="tooltip">
              <span className="tooltiptext">{value}</span>
            </div>
          </div>
        ) : null}
        <div
          style={{
            left: `${percent}%`,
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            WebkitTapHighlightColor: 'rgba(0,0,0,0)',
            zIndex: 400,
            width: 26,
            height: 42,
            cursor: 'pointer',
            // border: '1px solid grey',
            backgroundColor: 'none',
          }}
          {...getHandleProps(id, {
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave,
          })}
        />
        <button
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          style={{
            left: `${percent}%`,
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            WebkitTapHighlightColor: 'rgba(0,0,0,0)',
            zIndex: 300,
            width: 14,
            height: 14,
            border: 0,
            borderRadius: '50%',
            boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.2)',
            backgroundColor: disabled ? trasnsparent : '#fff',
          }}
          {...getHandleProps(id)}
        />
      </Fragment>
    )
  }
}

Handle.propTypes = {
  domain: PropTypes.array.isRequired,
  handle: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  getHandleProps: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
}

Handle.defaultProps = {
  disabled: false,
}

export default Handle
