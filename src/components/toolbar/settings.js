import React, { useState, useContext } from 'react'
import Menu from '@/components/menu'
import Button from '@/components/toolbar/button'
import Localize from '@/localize'
import { Checkbox } from 'reakit/Checkbox'
import { ReaderContext } from '@/context'

import Icon from '@mdi/react'
import {
  mdiSettings,
  mdiKeyboard,
  mdiBrightness4,
  mdiPagePrevious,
  mdiTranslate,
  mdiChevronRight,
} from '@mdi/js'

const SettingsMenu = React.forwardRef((props, ref) => {
  const context = useContext(ReaderContext)

  const settingsButton = <Button typeClass={'icon'} icon={mdiSettings} />

  const HandleThemeToggle = () => {
    context.updateState(prevState => ({
      theme: prevState.theme === 'Dark' ? 'Light' : 'Dark',
    }))
  }

  const HandleMangaToggle = () => {
    context.updateState(prevState => ({ mangaMode: !prevState.mangaMode }))
  }

  const isDarkTheme = context.state.theme === 'Dark'
  const isMangaMode = context.state.mangaMode

  const menuItems = [
    {
      itemType: 'checkbox',
      onChange: HandleMangaToggle,
      checked: isMangaMode,
      content: (
        <Checkbox icon={mdiPagePrevious} as={Button}>
          <div className={'menu-item-content'}>
            <div className={'mneu-item-label'}>{Localize['Manga mode']}</div>
            <div className={'menu-item-toggler'} />
          </div>
        </Checkbox>
      ),
    },
    {
      itemType: 'checkbox',
      onChange: HandleThemeToggle,
      checked: isDarkTheme,
      content: (
        <Checkbox icon={mdiBrightness4} as={Button}>
          <div className={'menu-item-content'}>
            <div className={'menu-item-label'}>{Localize['Dark theme']}</div>
            <div className={'menu-item-toggler'} />
          </div>
        </Checkbox>
      ),
    },
    { itemType: 'separator', content: <hr /> },
    {
      itemType: 'submenu',
      content: (
        <Button icon={mdiTranslate}>
          <div className={'menu-item-content'}>
            <div className={'menu-item-label'}>{Localize['Language']}</div>
            <Icon
              path={mdiChevronRight}
              size={'24px'}
              className={'villain-icon menu-item-icon'}
            />
          </div>
        </Button>
      ),
      nestedTitle: 'Languages',
      nestedItems: [],
    },
    {
      itemType: 'item',
      content: (
        <Button icon={mdiKeyboard}>
          <div className={'menu-item-content'}>{Localize['Keyboard shortcuts']}</div>
        </Button>
      ),
    },
  ]

  return (
    <Menu
      {...props}
      ref={ref}
      items={menuItems}
      tooltip={Localize['Settings']}
      placement={'top'}
      disclosure={settingsButton}
      ariaLabel={Localize['Settings']}
    />
  )
})

export default SettingsMenu
