import React, { Fragment, useContext, useCallback } from 'react'
import Slider from '@/component/controls/slider'
import { LAYOUT_MODE } from '@/constants'
import {
  useNavigation,
  useProgress,
  useFullscreenStatus,
  useLayout,
  useOptions,
} from '@/hooks'
import Button from '@/component/controls/button'
import { Icon } from '@mdi/react'
import { LANGUAGES } from '@/constants'

import {
  mdiPlay,
  mdiPause,
  mdiFullscreen,
  mdiCog,
  mdiDotsHorizontal,
  mdiPageFirst,
  mdiPageLast,
  mdiChevronLeft,
  mdiChevronRight,
  mdiBookOpen,
  mdiBookOpenOutline,
  mdiBookmark,
  mdiFullscreenExit,
  mdiPlusCircleOutline,
  mdiMinusCircleOutline,
  mdiPagePreviousOutline,
} from '@mdi/js'

import MenuButton from '@/component/controls/menu'

const Controls = ({ zoom, viewerActions }) => {
  const [layout, setLayout] = useLayout()
  const { zoomIn, zoomOut } = viewerActions
  const { options, setOptions } = useOptions()
  const { totalPages, currentPageNumber, currentPage, back, forward, go } =
    useNavigation()
  const progress = useProgress()
  const bufferPercent = Math.round(progress * 100)
  const [isFullscreen, toggleFullscreen] = useFullscreenStatus()

  const toggleLayoutMode = () => {
    const newLayout = layout === LAYOUT_MODE.BOOK ? LAYOUT_MODE.PAGE : LAYOUT_MODE.BOOK
    setLayout(newLayout)
  }

  const togglePlay = () => {
    setOptions({ play: !options.play })
  }

  const items = [
    {
      label: 'Loop',
      role: 'checkbox',
      value: options.loop,
      onChange: (loop) => setOptions({ loop: !options.loop }),
    },
    {
      label: 'Manga mode',
      role: 'checkbox',
      value: options.mangaMode,
      onChange: (mangaMode) => setOptions({ mangaMode: !options.mangaMode }),
    },
    {
      label: 'Playback interval',
      value: `${options.playbackInterval}s`,
      onChange: (playbackInterval) => setOptions({ playbackInterval }),
      submenu: [3, 6, 12, 24, 30, 60].map((duration, i) => {
        return { label: `${duration}s`, value: duration }
      }),
    },
    {
      label: 'Language',
      value: LANGUAGES[options.language],
      onChange: (language) => setOptions({ language }),
      submenu: Object.entries(LANGUAGES).map(([code, name], i) => {
        return { label: name, value: code }
      }),
    },
  ]

  return (
    <Fragment>
      <div
        role={'meter'}
        aria-label="Zoom level"
        aria-valuenow={zoom}
        aria-valuemin="0"
        aria-valuemax="100"
        className={'label--overlay'}
      >
        {' '}
        <span aria-hidden="true">{`${zoom}%`}</span>
      </div>
      <Button
        icon={mdiChevronLeft}
        typeClass={'control-overlay-left'}
        iconSize={1.68}
        onClick={back}
      />
      <Button
        icon={mdiChevronRight}
        typeClass={'control-overlay-right'}
        iconSize={1.68}
        onClick={forward}
      />

      <div className="villain-controls__background" />
      <div className="villain-controls">
        <Slider
          value={currentPageNumber}
          max={totalPages}
          onChange={go}
          bufferProgress={bufferPercent}
        />
        <div className="villain-controls__section">
          <div className="villain-controls--left">
            <Button
              icon={options.play ? mdiPause : mdiPlay}
              onClick={togglePlay}
              typeClass={'control'}
              iconSize={1.3}
            />
            <div className="villain-label">
              <span className="label">{currentPageNumber}</span>
              <span className="label">{'/'}</span>
              <span className="label">{totalPages}</span>
            </div>
          </div>
          <div className="villain-controls--right">
            <Button icon={mdiPlusCircleOutline} typeClass={'control'} onClick={zoomIn} />
            <Button
              icon={mdiMinusCircleOutline}
              typeClass={'control'}
              onClick={zoomOut}
            />
            <MenuButton icon={mdiCog} typeClass={'control'} items={items} />
            <Button
              icon={layout === LAYOUT_MODE.BOOK ? mdiBookOpen : mdiBookOpenOutline}
              onClick={toggleLayoutMode}
              typeClass={'control'}
            />
            <Button
              icon={isFullscreen ? mdiFullscreenExit : mdiFullscreen}
              typeClass={'control'}
              iconSize={1.1}
              onClick={toggleFullscreen}
            />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Controls
