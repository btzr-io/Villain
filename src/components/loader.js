import React, { PureComponent } from 'react'

class Loader extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { id } = this.props
    return (
      <div className={'villain-overlay'}>
        <div className={'villain-loader-indicator'} />
      </div>
    )
  }
}

export default Loader
