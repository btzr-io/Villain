import React, { useRef, useEffect, useContext } from 'react'
import { ReaderContext } from '@/context'
import clsx from 'clsx'
import Localize from '@/localize'

const Wrapp = ({ children, width, height, externalOptions }) => {
  const context = useContext(ReaderContext)
  const container = useRef(null)
  const { theme, language, fullscreen, autoHideControls } = context.state
  const size = { width, height }

  // Update context state on props change
  useEffect(() => {
    Object.entries(externalOptions).map(([key, value]) => {
      if (context.state[key] !== value) {
        context.updateState({ [key]: value })
      }
    })
  }, [externalOptions])

  // This needs to be on the render function
  Localize.setLanguage(language)

  return (
    <div
      ref={container}
      style={size}
      className={clsx(
        'villain',
        fullscreen && 'villain--fullscreen',
        !autoHideControls && 'villain--static'
      )}
      data-theme={theme}
    >
      {children(container ? container.current : null)}
    </div>
  )
}

export default React.memo(Wrapp)
