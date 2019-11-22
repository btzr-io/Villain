import React from 'react'
import Button from '@/components/toolbar/button'
import Localize from '@/localize'
import { ReaderContext } from '@/context'
import { mdiFullscreen, mdiFullscreenExit } from '@mdi/js'
import { toggleFullscreen } from '@/lib/full-screen'

const FullscreenButton = React.memo(
  ({ fullscreen, allowFullScreen, container, disabled }) => {
    const handleToggleFullscreen = () => {
      if (allowFullScreen) {
        toggleFullscreen(container)
      }
    }

    return (
      <Button
        typeClass={'icon'}
        icon={fullscreen ? mdiFullscreenExit : mdiFullscreen}
        onClick={handleToggleFullscreen}
        disabled={disabled}
        tooltip={fullscreen ? Localize['Exit fullscreen'] : Localize['Enter fullscreen']}
        tooltipPlacement={'top-end'}
        focusable
      />
    )
  }
)

const FullscreenConsumer = React.memo(({ container, disabled }) => (
  <ReaderContext.Consumer>
    {({ fullscreen, allowFullScreen }) => (
      <FullscreenButton
        disabled={disabled}
        container={container}
        fullscreen={fullscreen}
        allowFullScreen={allowFullScreen}
      />
    )}
  </ReaderContext.Consumer>
))

export default FullscreenConsumer
