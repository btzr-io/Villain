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

const Villain = ({ source, style, options, workerUrl }) => {
  return (
    <ReaderProvider externalOptions={options}>
      <Wrapp style={style}>
        {container => (
          <React.Fragment>
            <KeyboardConsumer container={container} />
            <OptionsConsumer options={options} />
            <UncompressConsumer source={source} workerUrl={workerUrl} />
            <CanvasRenderConsumer container={container} />
          </React.Fragment>
        )}
      </Wrapp>
    </ReaderProvider>
  )
}

Villain.propTypes = {
  source: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Blob)]),
  workerUrl: PropTypes.string,
  options: PropTypes.shape({
    theme: PropTypes.string,
    maxPages: PropTypes.number,
    allowFullscreen: PropTypes.boolean,
    allowGlobalShortcuts: PropTypes.boolean,
  }),
}

export default React.memo(Villain)
