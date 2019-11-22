import React, { useRef, useEffect } from 'react'
import { ReaderContext } from '@/context'
import clsx from 'clsx'
import Localize from '@/localize'

const Wrapper = React.forwardRef(
  ({ style, children, className, ...contextState }, ref) => {
    const { theme, language, fullscreen, autoHideControls } = contextState

    // This needs to be on the render function
    Localize.setLanguage(language)

    return (
      <div
        ref={ref}
        style={style}
        className={clsx(
          'villain',
          fullscreen && 'villain--fullscreen',
          !autoHideControls && 'villain--static',
          className
        )}
        data-theme={theme}
      >
        {children}
      </div>
    )
  }
)

const PureWrapper = React.memo(Wrapper)

const WrapperConsumer = ({ children, ...props }) => {
  const containerRef = useRef(null)
  return (
    <ReaderContext.Consumer>
      {({ theme, fullScreen, language, autoHideControls }) => {
        return (
          <PureWrapper
            {...props}
            ref={containerRef}
            theme={theme}
            fullScreen={fullScreen}
            autoHideControls={autoHideControls}
            language={language}
          >
            {children(containerRef ? containerRef.current : null)}
          </PureWrapper>
        )
      }}
    </ReaderContext.Consumer>
  )
}

export default React.memo(WrapperConsumer)
