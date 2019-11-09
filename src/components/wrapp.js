import React, { useRef, useContext } from 'react'
import { ReaderContext } from '@/context'
import clsx from 'clsx'
import Localize from '@/localize'

const Wrapp = ({ children, width, height, preview }) => {
  const context = useContext(ReaderContext)
  const container = useRef(null)
  const { theme, language, fullscreen, autoHideControls } = context.state
  const size = { width, height }

  // This needs to be on the render function
  Localize.setLanguage(language)

  return (
    <div
      ref={container}
      className={clsx(
        'villain',
        theme,
        fullscreen && 'villain-fullscreen',
        !autoHideControls && 'villain--static'
      )}
      style={size}
    >
      {children(container ? container.current : null)}
    </div>
  )
}

export default React.memo(Wrapp)
