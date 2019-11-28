import React from 'react'
import Button from '@/components/toolbar/button'
import { ReaderContext } from '@/context'
import { mdiBookOpen, mdiBookOpenOutline } from '@mdi/js'

const LayoutButton = React.memo(
  ({ disabled, bookMode, toggleSetting, allowFullScreen }) => {
    return (
      <Button
        typeClass={'icon'}
        icon={bookMode ? mdiBookOpen : mdiBookOpenOutline}
        onClick={() => toggleSetting('bookMode')}
        disabled={disabled}
        tooltip={bookMode ? 'Page view' : 'Book view'}
        tooltipPlacement={allowFullScreen ? 'top' : 'top-end'}
        focusable
      />
    )
  }
)

const LayoutConsumer = React.memo(({ disabled }) => (
  <ReaderContext.Consumer>
    {({ bookMode, allowFullScreen, toggleSetting }) => (
      <LayoutButton
        disabled={disabled}
        toggleSetting={toggleSetting}
        allowFullScreen={allowFullScreen}
        bookMode={bookMode}
      />
    )}
  </ReaderContext.Consumer>
))

export default LayoutConsumer
