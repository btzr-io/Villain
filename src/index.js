import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Uncompress from './components/uncompress'
import CanvasRender from './components/render'
import { ReaderContext, ReaderProvider } from './context'

const defaultOpts = {
  theme: 'dark',
  initialPage: 0,
  workerPath: null,
}

class Villian extends Component {
  static contextType = ReaderContext

  static defaultProps = {
    file: null,
    options: { ...defaultOpts },
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { file, options } = this.props
    const opts = { ...defaultOpts, ...options }

    return (
      <ReaderProvider>
        <div className={'villian'}>
          <Uncompress
            file={file}
            workerPath={opts.workerPath}
            initialPage={opts.initialPage}
          >
            <ReaderContext.Consumer>
              {({ state }) => (
                <CanvasRender
                  id={'osd-canvas-render'}
                  currentPage={state.currentPage}
                  initialPage={options.initialPage}
                />
              )}
            </ReaderContext.Consumer>
          </Uncompress>
        </div>
      </ReaderProvider>
    )
  }
}

Villian.propTypes = {
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Blob)]),
  options: PropTypes.shape({
    theme: PropTypes.string,
    workerPath: PropTypes.string,
  }),
}

export default Villian
