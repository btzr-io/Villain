import React from 'react'
import Menu from '@/components/menu'
import Localized from '@/components/localized'
import Localize from '@/localize'
import Button from '@/components/toolbar/button'
import { ReaderContext } from '@/context'

import getLanguageName from '@/lib/language-name'

import Icon from '@mdi/react'

import {
  mdiCog,
  mdiKeyboard,
  mdiTranslate,
  mdiBrightness4,
  mdiPagePrevious,
} from '@mdi/js'

const SettingsButton = React.memo(
  React.forwardRef((props, ref) => (
    <Button
      {...props}
      ref={ref}
      icon={mdiCog}
      typeClass={'icon'}
      tooltip={'Settings'}
    />
  ))
)

const SettingsMenu = React.forwardRef(
  ({ theme, mangaMode, forceClose, updateContextState }, ref) => {
    const handleThemeToggle = () => {
      updateContextState(prevState => ({
        theme: prevState.theme === 'Dark' ? 'Light' : 'Dark',
      }))
    }

    const handleMangaToggle = () => {
      updateContextState(prevState => ({ mangaMode: !prevState.mangaMode }))
    }

    const handleLanguageChange = language => {
      updateContextState({ language })
    }

    const isDarkTheme = theme === 'Dark'
    const isMangaMode = mangaMode === true

    const menuItems = [
      {
        id: 'toggler-manga-mode',
        icon: mdiPagePrevious,
        content: 'Manga mode',
        checked: isMangaMode,
        itemType: 'checkbox',
        onChange: handleMangaToggle,
      },
      {
        id: 'toggler-dark-theme',
        icon: mdiBrightness4,
        content: 'Dark theme',
        checked: isDarkTheme,
        itemType: 'checkbox',
        onChange: handleThemeToggle,
      },
      { id: 'first-separator', itemType: 'separator' },
      {
        id: 'submenu-select-langauge',
        icon: mdiTranslate,
        content: 'Language',
        itemType: 'submenu',
        nestedTitle: 'Languages',
        nestedList: {
          items: Localize.getAvailableLanguages(),
          getProps: ({ item, closeSubmenu, title }) => {
            return {
              id: `language-${item}`,
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
    ]

    return (
      <Menu
        ref={ref}
        items={menuItems}
        placement={'top'}
        disclosure={SettingsButton}
        forceClose={forceClose}
        ariaLabel={Localize['Settings']}
      />
    )
  }
)

const PureSettingsMenu = React.memo(SettingsMenu)

const SettingsMenuConsumer = React.forwardRef((props, ref) => (
  <ReaderContext.Consumer>
    {({ theme, mangaMode, updateState }) => {
      return (
        <PureSettingsMenu
          {...props}
          ref={ref}
          theme={theme}
          mangaMode={mangaMode}
          updateContextState={updateState}
        />
      )
    }}
  </ReaderContext.Consumer>
))

export default React.memo(SettingsMenuConsumer)
