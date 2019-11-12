import React, { useState, useContext } from 'react'
import Menu from '@/components/menu'
import Button from '@/components/toolbar/button'
import Localize from '@/localize'
import { ReaderContext } from '@/context'

import getLanguageName from '@/lib/language-name'

import Icon from '@mdi/react'

import {
  mdiSettings,
  mdiKeyboard,
  mdiTranslate,
  mdiBrightness4,
  mdiPagePrevious,
} from '@mdi/js'

const SettingsMenu = React.forwardRef((props, ref) => {
  const context = useContext(ReaderContext)

  const settingsButton = <Button typeClass={'icon'} icon={mdiSettings} />

  const handleThemeToggle = () => {
    context.updateState(prevState => ({
      theme: prevState.theme === 'Dark' ? 'Light' : 'Dark',
    }))
  }

  const handleMangaToggle = () => {
    context.updateState(prevState => ({ mangaMode: !prevState.mangaMode }))
  }

  const handleLanguageChange = language => {
    context.updateState({ language })
  }

  const isDarkTheme = context.state.theme === 'Dark'
  const isMangaMode = context.state.mangaMode

  const menuItems = [
    {
      icon: mdiPagePrevious,
      content: Localize['Manga mode'],
      checked: isMangaMode,
      itemType: 'checkbox',
      onChange: handleMangaToggle,
    },
    {
      icon: mdiBrightness4,
      content: Localize['Dark theme'],
      checked: isDarkTheme,
      itemType: 'checkbox',
      onChange: handleThemeToggle,
    },
    { itemType: 'separator' },
    {
      icon: mdiTranslate,
      content: Localize['Language'],
      itemType: 'submenu',
      nestedTitle: Localize['Languages'],
      nestedList: {
        items: Localize.getAvailableLanguages(),
        getProps: ({ item, index, closeSubmenu, title }) => {
          return {
            name: title,
            value: item,
            itemType: 'radio',
            checked: Localize.getLanguage() === item,
            onClick: closeSubmenu,
            onChange: () => handleLanguageChange(item),
          }
        },
        getContent: item => getLanguageName(item),
      },
    },
    /*
    { itemType: 'separator' },
    {
      icon: mdiKeyboard,
      content: Localize['Keyboard shortcuts'],
    }, */
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
