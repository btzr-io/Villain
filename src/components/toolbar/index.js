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
    const { allowFullScreen, showControls, toggleFullscreen } = this.props
    const {
      navigateForward,
      navigateBackward,
      toggleSetting,
      toggleTheme,
      togglePin,
    } = this.context
    const {
      theme,
      pages,
      bookMode,
      fullscreen,
      currentPage,
      currentZoom,
      totalPages,
      autoHideControls,
    } = this.context.state

    const layoutProps = {
      icon: bookMode ? mdiBookOpenOutline : mdiBookOpen,
      // label: bookMode ? 'Book mode' : 'Single page',
      title: bookMode ? 'Book mode' : 'Single page',
    }

    const progress = (pages.length / totalPages) * 100
    const themeIcon = theme === 'light' ? mdiWeatherNight : mdiWhiteBalanceSunny
    const fullScreenIcon = fullscreen ? mdiFullscreenExit : mdiFullscreen
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

        <div className={'villain-toolbar-group'}>
          <ZoomControls onUpdate={this.props.updateZoom} currentZoom={currentZoom} />
          <div className="divider" />
          <Button
            type={'icon'}
            title={'Pin'}
            icon={mdiPin}
            active={!autoHideControls}
            onClick={togglePin}
          />
          <Button
            type={'icon'}
            onClick={() => toggleSetting('bookMode')}
            {...layoutProps}
          />
          <Button type={'icon'} title={'Theme'} icon={themeIcon} onClick={toggleTheme} />
          <Button
            type={'icon'}
            title={'Fullscreen'}
            icon={fullScreenIcon}
            onClick={toggleFullscreen}
          />
        </div>
      </div>
    )
  }
}

export default Toolbar
