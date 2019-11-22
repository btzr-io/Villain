import React, { memo, useEffect, useState, useCallback } from 'react'
import clsx from 'clsx'
import Button from './button'
import Slider from '@/components/slider'
import Settings from './settings'
import ZoomControls from '@/components/toolbar/controls/zoom'
import LayoutButton from '@/components/toolbar/controls/layout'
import FullscreenButton from '@/components/toolbar/controls/fullscreen'
import NavigationControls from '@/components/toolbar/controls/navigation'
import Localize from '@/localize'
import { ReaderContext } from '@/context'

import {
  Toolbar as ToolbarBase,
  ToolbarItem,
  ToolbarSeparator,
  useToolbarState,
} from 'reakit'

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

    return (
      <div
        aria-label={'Toolbar'}
        className={clsx('villain-toolbar', !visible && 'villain-toolbar--hide')}
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

          <Settings />

          <Button
            typeClass={'icon'}
            icon={autoHideControls ? mdiPin : mdiPinOff}
            onClick={togglePin}
            disabled={renderError}
            tooltip={
              autoHideControls ? Localize['Pin toolbar'] : Localize['Unpin toolbar']
            }
            focusable
          />

          <LayoutButton disabled={renderError} />

          <FullscreenButton container={container} disabled={renderError} />
        </div>
      </div>
    )
  }
)

const ToolbarConsumer = memo(props => (
  <ReaderContext.Consumer>
    {({
      // State
      focus,
      hover,
      renderError,
      autoHideControls,
      // Actions
      togglePin,
    }) => (
      <Toolbar
        {...props}
        visible={!autoHideControls || focus || hover}
        renderError={renderError}
        autoHideControls={autoHideControls}
        togglePin={togglePin}
      />
    )}
  </ReaderContext.Consumer>
))

export default ToolbarConsumer
