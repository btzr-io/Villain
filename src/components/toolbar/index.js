import React, { memo, useEffect, useState, useCallback } from 'react'
import clsx from 'clsx'
import Button from './button'
import Slider from '@/components/slider'
import Settings from './settings'
import ZoomControls from '@/components/toolbar/controls/zoom'
import LayoutButton from '@/components/toolbar/controls/layout'
import FullscreenButton from '@/components/toolbar/controls/fullscreen'
import NavigationControls from '@/components/toolbar/controls/navigation'
import { ReaderContext } from '@/context'

import {
  mdiPin,
  mdiPinOff,
  mdiBookOpen,
  mdiWeatherNight,
  mdiBookOpenOutline,
  mdiWhiteBalanceSunny,
} from '@mdi/js'

const Toolbar = memo(
  ({ visible, container, updateZoom, zoomIn, zoomOut, ...context }) => {
    const { togglePin, renderError, autoHideControls } = context
    const [show, setShow] = React.useState(true)
    const [hover, setHover] = React.useState(false)

    const handleMouseEnter = () => {
      setHover(true)
    }

    const handleMouseExit = () => {
      setHover(false)
    }

    useEffect(() => {
      const newState = visible || hover
      if (newState !== show) {
        setShow(newState)
      }
    }, [visible, hover])

    return (
      <div
        aria-label={'Toolbar'}
        onMouseOver={handleMouseEnter}
        onMouseLeave={handleMouseExit}
        className={clsx('villain-toolbar', !show && 'villain-toolbar--hide')}
      >
        <NavigationControls />

        <ReaderContext.Consumer>
          {({ pages, totalPages, currentPage, mangaMode, navigateToPage }) => {
            const bufferProgress = Math.round((pages.length / totalPages) * 10) * 10

            return (
              totalPages && (
                <div className={'villain-toolbar__group villain-toolbar__group--expand'}>
                  <Slider
                    max={totalPages}
                    value={currentPage}
                    reversed={mangaMode}
                    onChange={navigateToPage}
                    bufferProgress={bufferProgress}
                  />
                </div>
              )
            )
          }}
        </ReaderContext.Consumer>

        <div className={'villain-toolbar__group'} disabled={renderError}>
          <ZoomControls
            zoomIn={zoomIn}
            zoomOut={zoomOut}
            onUpdate={updateZoom}
            disabled={renderError}
          />

          <hr className="villain-toolbar__divider" />

          <Settings forceClose={!show} />

          <Button
            typeClass={'icon'}
            icon={autoHideControls ? mdiPin : mdiPinOff}
            onClick={togglePin}
            disabled={renderError}
            tooltip={autoHideControls ? 'Pin toolbar' : 'Unpin toolbar'}
            focusable
          />

          <LayoutButton disabled={renderError} />

          <FullscreenButton container={container} disabled={renderError} />
        </div>
      </div>
    )
  }
)

const ToolbarConsumer = memo(props => {
  // Local state is used instead of context for better peformance
  const [hover, setHover] = useState(false)
  const [focus, setFocus] = useState(false)

  const handleMouseOver = () => {
    setHover(true)
  }

  const handleMouseLeave = () => {
    setHover(false)
  }

  const handleFocus = () => {
    setFocus(true)
  }

  const handleBlur = () => {
    setFocus(false)
  }

  useEffect(() => {
    props.container.addEventListener('blur', handleBlur, true)
    props.container.addEventListener('focus', handleFocus, true)
    props.container.addEventListener('mouseover', handleMouseOver)
    props.container.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      props.container.removeEventListener('blur', handleBlur, true)
      props.container.removeEventListener('focus', handleFocus, true)
      props.container.removeEventListener('mouseover', handleMouseOver)
      props.container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <ReaderContext.Consumer>
      {({
        // State
        fullscreen,
        renderError,
        autoHideControls,
        // Actions
        togglePin,
      }) => (
        <Toolbar
          {...props}
          visible={!autoHideControls || focus || (hover && !fullscreen)}
          renderError={renderError}
          autoHideControls={autoHideControls}
          togglePin={togglePin}
        />
      )}
    </ReaderContext.Consumer>
  )
})

export default ToolbarConsumer
