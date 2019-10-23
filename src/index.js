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
  preview: null,
  workerUrl: null,
  allowFullScreen: true,
  autoHideControls: false,
  allowGlobalShortcuts: false,
}

class Villain extends Component {
  static contextType = ReaderContext

  static defaultProps = {
    file: null,
    width: '780px',
    height: '380px',
    options: { ...defaultOpts },
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { file, width, height, options } = this.props

    // Merge default options
    const opts = { ...defaultOpts, ...options }

    // Set default value in context state
    // Nore: unsure about this, probably not a good idea, please fix it!
    const {
      autoHideControls,
      allowFullScreen,
      mangaMode,
      theme,
      allowGlobalShortcuts,
    } = opts

    return (
      <ReaderProvider
        defaultState={{ theme, autoHideControls, mangaMode, allowGlobalShortcuts }}
      >
        <Wrapp width={width} height={height} preview={opts.preview}>
          {container => (
            <Uncompress file={file} workerUrl={opts.workerUrl} preview={opts.preview}>
              <ReaderContext.Consumer>
                {({ state }) => (
                  <CanvasRender
                    id={'osd-canvas-render'}
                    hover={state.hover}
                    focus={state.focus}
                    theme={theme}
                    container={container}
                    bookMode={state.bookMode}
                    mangaMode={mangaMode}
                    allowGlobalShortcuts={state.allowGlobalShortcuts}
                    currentPage={state.currentPage}
                    allowFullScreen={allowFullScreen}
                    autoHideControls={autoHideControls}
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
