import React, { Component } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import Wrapp from '@/components/wrapp'
import Uncompress from '@/components/uncompress'
import CanvasRender from '@/components/render'
import { ReaderContext, ReaderProvider } from '@/context'

// Css
import './css/styles.css'

const defaultOpts = {
  theme: 'Dark',
  overlay: true,
  workerUrl: null,
  preview: null,
}

class Villain extends Component {
  static contextType = ReaderContext

  static defaultProps = {
    file: null,
    width: '740px',
    height: '380px',
    options: { ...defaultOpts },
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { file, width, height, options } = this.props
    const opts = { ...defaultOpts, ...options }

    return (
      <ReaderProvider>
        <Wrapp width={width} height={height} preview={opts.preview}>
          {container => (
            <Uncompress file={file} workerUrl={opts.workerUrl} preview={opts.preview}>
              <ReaderContext.Consumer>
                {({ state }) => (
                  <CanvasRender
                    id={'osd-canvas-render'}
                    hover={state.hover}
                    focus={state.focus}
                    container={container}
                    bookMode={state.bookMode}
                    currentPage={state.currentPage}
                    autoHideControls={state.autoHideControls}
                    renderError={state.renderError}
                  />
                )}
              </ReaderContext.Consumer>
            </Uncompress>
          )}
        </Wrapp>
      </ReaderProvider>
    )
  }
}

Villain.propTypes = {
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Blob)]),
  width: PropTypes.string,
  height: PropTypes.string,
  options: PropTypes.shape({
    theme: PropTypes.string,
    workerUrl: PropTypes.string,
    preview: PropTypes.number,
  }),
}

export default Villain
