import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import Wrapp from '@/components/wrapp'
import OptionsConsumer from '@/components/options'
import KeyboardConsumer from '@/components/keyboard'
import UncompressConsumer from '@/components/uncompress'
import CanvasRenderConsumer from '@/components/render'
import { ReaderContext, ReaderProvider } from '@/context'
// Styles
import '@/css'

const Villain = ({ file, options, workerUrl }) => {
  return (
    <ReaderProvider externalOptions={options}>
      <Wrapp>
        {container => (
          <React.Fragment>
            <KeyboardConsumer container={container} />
            <OptionsConsumer options={options} />
            <UncompressConsumer file={file} workerUrl={workerUrl} />
            <CanvasRenderConsumer container={container} />
          </React.Fragment>
        )}
      </Wrapp>
    </ReaderProvider>
  )
}

Villain.propTypes = {
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Blob)]),
  options: PropTypes.shape({
    theme: PropTypes.string,
    maxPages: PropTypes.number,
    workerUrl: PropTypes.string,
    allowFullscreen: PropTypes.boolean,
    allowGlobalShortcuts: PropTypes.boolean,
  }),
}

export default React.memo(Villain)
