import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Wrapp from './components/wrapp'
import Uncompress from './components/uncompress'
import CanvasRender from './components/render'
import { ReaderContext, ReaderProvider } from './context'

const defaultOpts = {
  theme: 'dark',
  initialPage: 0,
  workerPath: null,
  overlay: true,
}

class Villain extends Component {
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
        <Wrapp>
          <Uncompress
            file={file}
            workerPath={opts.workerPath}
            initialPage={opts.initialPage}
          >
            <ReaderContext.Consumer>
              {({ state }) => (
                <CanvasRender
                  id={'osd-canvas-render'}
                  bookMode={state.bookMode}
                  currentPage={state.currentPage}
                  initialPage={options.initialPage}
                />
              )}
            </ReaderContext.Consumer>
          </Uncompress>
        </Wrapp>
      </ReaderProvider>
    )
  }
}

Villain.propTypes = {
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Blob)]),
  options: PropTypes.shape({
    theme: PropTypes.string,
    workerPath: PropTypes.string,
  }),
}

export default Villain
