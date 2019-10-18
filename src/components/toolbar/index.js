import React, { Component } from 'react'
import clsx from 'clsx'
import Button from './button'
import ZoomControls from './zoom'
import NavigationControls from './navigation'
import Slider from '@/components/slider'
import { ReaderContext } from '@/context'

import {
  mdiPin,
  mdiBookOpen,
  mdiFullscreen,
  mdiWeatherNight,
  mdiFullscreenExit,
  mdiBookOpenOutline,
  mdiWhiteBalanceSunny,
} from '@mdi/js'

class Toolbar extends Component {
  static contextType = ReaderContext

  constructor(props) {
    super(props)
  }

  render() {
    // Component Props
    const { allowFullScreen, showControls, toggleFullscreen, renderError } = this.props

    // Actions
    const {
      state,
      navigateForward,
      navigateBackward,
      toggleSetting,
      toggleTheme,
      togglePin,
    } = this.context

    // State
    const {
      theme,
      pages,
      bookMode,
      fullscreen,
      currentPage,
      currentZoom,
      totalPages,
      autoHideControls,
    } = state

    const layoutProps = {
      icon: bookMode ? mdiBookOpenOutline : mdiBookOpen,
      // label: bookMode ? 'Book mode' : 'Single page',
      title: bookMode ? 'Book mode' : 'Single page',
    }

    const fullScreenIcon = fullscreen ? mdiFullscreenExit : mdiFullscreen

    const themeProps = {
      icon: theme === 'Light' ? mdiWeatherNight : mdiWhiteBalanceSunny,
      title: `${theme} theme`,
    }

    const progress = (pages.length / totalPages) * 100

    return (
      <div className={clsx('villain-toolbar', !showControls && 'villain-toolbar-hide')}>
        <NavigationControls currentPage={currentPage} totalPages={totalPages} />

        <div className={'villain-toolbar-group villain-toolbar-group-expand'}>
          <Slider
            max={totalPages}
            value={currentPage}
            bufferProgress={progress}
            onChange={this.context.navigateToPage}
          />
        </div>

        <div className={'villain-toolbar-group'} disabled={renderError}>
          <ZoomControls onUpdate={this.props.updateZoom} currentZoom={currentZoom} disabled={renderError} />
          <div className="divider" />
          <Button
            type={'icon'}
            title={'Pin'}
            icon={mdiPin}
            active={!autoHideControls}
            onClick={togglePin}
            disabled={renderError}
          />
          <Button
            type={'icon'}
            onClick={() => toggleSetting('bookMode')}
            disabled={renderError}
            {...layoutProps}
          />
          <Button type={'icon'} onClick={toggleTheme} disabled={renderError} {...themeProps} />
          <Button
            type={'icon'}
            title={'Fullscreen'}
            icon={fullScreenIcon}
            onClick={toggleFullscreen}
            disabled={renderError}
          />
        </div>
      </div>
    )
  }
}

export default Toolbar
