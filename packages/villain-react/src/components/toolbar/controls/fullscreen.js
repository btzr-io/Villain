import React from 'react'
import Button from '@/components/toolbar/button'
import { ReaderContext } from '@/context'
import { mdiFullscreen, mdiFullscreenExit } from '@mdi/js'
import { toggleFullscreen } from '@/lib/full-screen'

const FullscreenButton = React.memo(({ fullscreen, container, disabled }) => {
  const handleToggleFullscreen = () => {
    toggleFullscreen(container)
  }

  return (
    <Button
      typeClass={'icon'}
      icon={fullscreen ? mdiFullscreenExit : mdiFullscreen}
      onClick={handleToggleFullscreen}
      disabled={disabled}
      tooltip={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
      tooltipPlacement={'top-end'}
      focusable
    />
  )
})

const FullscreenConsumer = React.memo(({ container, disabled }) => (
  <ReaderContext.Consumer>
    {({ fullscreen, allowFullScreen }) =>
      allowFullScreen && (
        <FullscreenButton
          disabled={disabled}
          container={container}
          fullscreen={fullscreen}
          allowFullScreen={allowFullScreen}
        />
      )
    }
  </ReaderContext.Consumer>
))

export default FullscreenConsumer
