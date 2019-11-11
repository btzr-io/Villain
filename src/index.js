import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import Wrapp from '@/components/wrapp'
import Uncompress from '@/components/uncompress'
import CanvasRender from '@/components/render'
import { ReaderContext, ReaderProvider } from '@/context'

// Styles
import '@/css'

const Villain = ({ file, width, height, options, workerUrl }) => {
  return (
    <ReaderProvider externalOptions={options}>
      <Wrapp width={width} height={height} externalOptions={options}>
        {container => (
          <Uncompress file={file} workerUrl={workerUrl}>
            <ReaderContext.Consumer>
              {context => (
                <CanvasRender
                  id={'osd-canvas-render'}
                  container={container}
                  contextState={context.state}
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
