import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import Wrapp from '@/components/wrapp'
import Uncompress from '@/components/uncompress'
import CanvasRender from '@/components/render'
import { ReaderContext, ReaderProvider } from '@/context'
// Styles
import '@/css'

const Villain = ({ file, width, height, options }) => {
  const {
    allowFullScreen,
    allowGlobalShortcuts,
    autoHideControls,
    mangaMode,
    preview,
    theme,
    workerUrl,
  } = options

  return (
    <ReaderProvider
      defaultState={{ theme, autoHideControls, mangaMode, allowGlobalShortcuts }}
    >
      <Wrapp width={width} height={height} preview={preview}>
        {container => (
          <Uncompress file={file} workerUrl={workerUrl} preview={preview}>
            <ReaderContext.Consumer>
              {({ state }) => (
                <CanvasRender
                  id={'osd-canvas-render'}
                  theme={theme}
                  hover={state.hover}
                  focus={state.focus}
                  container={container}
                  bookMode={state.bookMode}
                  mangaMode={mangaMode}
                  allowGlobalShortcuts={allowGlobalShortcuts}
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
