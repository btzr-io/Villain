import React, { useRef, useContext } from 'react'
import { ReaderContext } from '@/context'
import clsx from 'clsx'

const Wrapp = ({ children, width, height, preview }) => {
  const context = useContext(ReaderContext)
  const container = useRef(null)
  const { theme, fullscreen, autoHideControls } = context.state
  const size = { width, height }

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

export default Wrapp
