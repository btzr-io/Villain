import React from 'react'
import { ReaderContext } from '@/context'
import { getNestedFocus, getInteractionFocus } from '@/hooks/use-focus'
import { toggleFullscreen } from '@/lib/full-screen'

const KeyboardConsumer = React.memo(({ container }) => {
  const context = React.useContext(ReaderContext)

  const {
    error,
    mangaMode,
    navigateBackward,
    navigateForward,
    allowGlobalShortcuts,
    allowFullScreen,
  } = context

  // Note: We should provide an api to add, define, overwrite key shortcuts
  const handleShortcuts = React.useCallback(
    event => {
      // Check if it should restrict listening for key shortcuts on player focus
      if (error || getInteractionFocus()) {
        return
      }

      if (!allowGlobalShortcuts && !getNestedFocus(container)) {
        return
      }

      const navigateRight = mangaMode ? navigateBackward : navigateForward
      const navigateLeft = mangaMode ? navigateForward : navigateBackward

      switch (event.key) {
        // Toggle fullscreen of viewer.
        // Note: PreventDefault is used to remove flp shortcut.
        case 'f':
          event.preventDefault()
          toggleFullscreen(container)
          break

        // Navigation to next page (previous when in mangaMode)
        case 'ArrowRight':
          navigateRight()
          break

        // Navigation to previous page (next when in mangaMode)
        case 'ArrowLeft':
          navigateLeft()
          break
      }
    },
    [
      allowFullScreen,
      allowGlobalShortcuts,
      mangaMode,
      navigateBackward,
      navigateForward,
      container,
    ]
  )

  React.useEffect(() => {
    document.addEventListener('keydown', handleShortcuts)

    return () => {
      document.removeEventListener('keydown', handleShortcuts)
    }
  }, [handleShortcuts])

  return null
})

export default KeyboardConsumer
