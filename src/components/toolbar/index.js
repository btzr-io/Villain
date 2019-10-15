import React, { Component } from 'react'
import clsx from 'clsx'
import Button from './button'
import ZoomControls from './zoom'
import NavigationControls from './navigation'
import Slider from './slider/index.js'
import { ReaderContext } from '../../context'

import {
  mdiPin,
  mdiBookOpen,
  mdiFullscreen,
  mdiFullscreenExit,
  mdiBookOpenOutline,
} from '@mdi/js'

class Toolbar extends Component {
  static contextType = ReaderContext

  constructor(props) {
    super(props)
  }

  render() {
    const { allowFullScreen, showControls } = this.props
    const { navigateForward, navigateBackward, toggleSetting, togglePin } = this.context
    const {
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

    const fullScreenIcon = fullscreen ? mdiFullscreenExit : mdiFullscreen
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

        <div className={'villain-toolbar-group'}>
          <ZoomControls onUpdate={this.props.updateZoom} currentZoom={currentZoom} />
          <div className="divider" />
          <Button
            type={'icon'}
            title={'Pin'}
            icon={mdiPin}
            active={!autoHideControls}
            onClick={() => togglePin()}
          />
          <Button
            type={'icon'}
            onClick={() => toggleSetting('bookMode')}
            {...layoutProps}
          />
          <Button
            type={'icon'}
            title={'Fullscreen'}
            icon={fullScreenIcon}
            onClick={() => toggleSetting('fullscreen')}
          />
        </div>
      </div>
    )
  }
}

export default Toolbar
