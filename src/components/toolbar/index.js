import React, { Component } from 'react'
import clsx from 'clsx'
import Button from './button'
import WrapSelect from './select'
import ZoomControls from './zoom'
import NavigationControls from './navigation'
import Slider from '@/components/slider'
import { ReaderContext } from '@/context'
import Localize from '@/localize'

import {
  mdiPin,
  mdiBookOpen,
  mdiFullscreen,
  mdiWeatherNight,
  mdiFullscreenExit,
  mdiBookOpenOutline,
  mdiWhiteBalanceSunny,
  mdiWeb,
} from '@mdi/js'

class Toolbar extends Component {
  static contextType = ReaderContext

  constructor(props) {
    super(props)
    this.state = {
      lang: 'en-US',
    }
  }

  isFocused = () => {
    const elem = document.activeElement
    const contains = document.querySelector('div.villain').contains(elem)
    const elemType = elem.tagName.toLowerCase()

    if (
      contains &&
      elemType !== 'input' &&
      elemType !== 'textarea' &&
      elemType !== 'button'
    ) {
      return true
    }
    return false
  }

  // Note:? We should provide an api to add, define, overwrite key shortcuts
  handleShortcuts = ({ key }) => {
    const { toggleFullscreen } = this.props
    const { allowGlobalShortcuts } = this.context.state

    // Check if it should restrict listening for key shortcuts on player focus
    if (!this.isFocused() && !allowGlobalShortcuts) {
      return
    }

    const { toggleSetting, navigateForward, navigateBackward } = this.context
    const { mangaMode } = this.context.state

    const navigateRight = mangaMode ? navigateBackward : navigateForward
    const navigateLeft = mangaMode ? navigateForward : navigateBackward

    switch (key) {
      // Toggle fullscreen of viewer.
      // Note: Current conflict with openseadragon key shortcuts.
      // Note: PreventDefault is used to remove flp shortcut.
      case 'f':
        event.preventDefault()
        toggleFullscreen()
        break

      // Navigation to next page (previous when in mangaMode)
      case 'ArrowRight':
        navigateRight()
        break

      // Navigation to previous page (next when in mangaMode)
      case 'ArrowLeft':
        navigateLeft()
        break
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleShortcuts)
  }

  // This don't work as expected:
  // See: https://github.com/btzr-io/Villain/issues/107
  /*
  componentDidUpdate(prevProps, prevState) {
    if(prevState.lang !== this.state.lang) {
      Localize.setLanguage(this.state.lang)
    }
  }
  */

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleShortcuts)
  }

  handleLanguageChange = ({ target }) => {
    this.setState({ lang: target.value })
  }

  render() {
    // Component Props
    const {
      allowFullScreen,
      showControls,
      toggleFullscreen,
      renderError,
      localize,
    } = this.props

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
      mangaMode,
      fullscreen,
      currentPage,
      currentZoom,
      totalPages,
      autoHideControls,
    } = state

    const layoutProps = {
      icon: bookMode ? mdiBookOpen : mdiBookOpenOutline,
    }

    const fullScreenIcon = fullscreen ? mdiFullscreenExit : mdiFullscreen

    const themeProps = {
      icon: theme === 'Light' ? mdiWeatherNight : mdiWhiteBalanceSunny,
    }

    const progress = (pages.length / totalPages) * 100

    // Note: Unsure about this, it probalby affect peformance
    Localize.setLanguage(this.state.lang)

    return (
      <div className={clsx('villain-toolbar', !showControls && 'villain-toolbar-hide')}>
        <NavigationControls currentPage={currentPage} totalPages={totalPages} />

        <div className={'villain-toolbar-group villain-toolbar-group-expand'}>
          <Slider
            max={totalPages}
            value={currentPage}
            bufferProgress={progress}
            onChange={this.context.navigateToPage}
            reversed={mangaMode}
          />
        </div>

        <div className={'villain-toolbar-group'} disabled={renderError}>
          <ZoomControls
            onUpdate={this.props.updateZoom}
            currentZoom={currentZoom}
            disabled={renderError}
          />
          <div className="divider" />
          <Button
            type={'icon'}
            icon={mdiPin}
            active={!autoHideControls}
            onClick={togglePin}
            disabled={renderError}
            tooltip={Localize['Pin controls']}
          />
          <Button
            type={'icon'}
            tooltip={bookMode ? Localize['Page view'] : Localize['Book view']}
            onClick={() => toggleSetting('bookMode')}
            disabled={renderError}
            {...layoutProps}
          />
          <Button
            type={'icon'}
            tooltip={theme === 'Light' ? Localize['Dark theme'] : Localize['Light theme']}
            onClick={toggleTheme}
            disabled={renderError}
            {...themeProps}
          />
          {allowFullScreen && (
            <Button
              type={'icon'}
              icon={fullScreenIcon}
              tooltip={
                fullscreen ? Localize['Exit fullscreen'] : Localize['Enter fullscreen']
              }
              tooltipClass={'right-edge'}
              onClick={toggleFullscreen}
              disabled={renderError}
            />
          )}
          <WrapSelect
            value={this.state.lang}
            options={Localize.getAvailableLanguages()}
            onChange={this.handleLanguageChange}
            icon={mdiWeb}
          />
        </div>
      </div>
    )
  }
}

export default Toolbar
