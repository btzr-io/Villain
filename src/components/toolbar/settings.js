import React, { useState, useContext } from 'react'
import Menu from '@/components/menu'
import Button from '@/components/toolbar/button'
import Localize from '@/localize'
import { ReaderContext } from '@/context'
import { mdiSettings, mdiKeyboard, mdiBrightness4, mdiPagePrevious } from '@mdi/js'

const SettingsMenu = () => {
  const [language, setLanguage] = useState(false)
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

  const HandleLanguageToggle = () => {
    setLanguage(!language)
  }

  const isDarkTheme = context.state.theme === 'Dark'
  const isMangaMode = context.state.mangaMode

  const menuItems = [
    {
      itemType: 'checkbox',
      onChange: HandleLanguageToggle,
      checked: isMangaMode,
      content: (
        <Button icon={mdiPagePrevious}>
          <div className={'menu-item-content'}>
            <div className={'menu-item-label'}>{Localize['Languages']}</div>
          </div>
        </Button>
      ),
    },
    {
      itemType: 'checkbox',
      onChange: HandleMangaToggle,
      checked: isMangaMode,
      content: (
        <Button icon={mdiPagePrevious}>
          <div className={'menu-item-content'}>
            <div className={'menu-item-label'}>{Localize['Manga mode']}</div>
            <div className={'menu-item-toggler'} />
          </div>
        </Button>
      ),
    },
    {
      itemType: 'checkbox',
      onChange: HandleThemeToggle,
      checked: isDarkTheme,
      content: (
        <Button icon={mdiBrightness4}>
          <div className={'menu-item-content'}>
            <div className={'menu-item-label'}>{Localize['Dark theme']}</div>
            <div className={'menu-item-toggler'} />
          </div>
        </Button>
      ),
    },
    { itemType: 'separator', content: <hr /> },
    {
      itemType: 'item',
      content: (
        <Button icon={mdiKeyboard}>
          <div className={'menu-item-content'}>{Localize['Keyboard shortcuts']}</div>
        </Button>
      ),
    },
  ]

  const languageItems = [
    {
      itemType: 'checkbox',
      onChange: HandleLanguageToggle,
      checked: isMangaMode,
      content: (
        <Button>
          <div className={'menu-item-content'}>
            <div className={'menu-item-label'}>{Localize['English']}</div>
          </div>
        </Button>
      ),
    },
    {
      itemType: 'checkbox',
      onChange: HandleLanguageToggle,
      checked: isMangaMode,
      content: (
        <Button>
          <div className={'menu-item-content'}>
            <div className={'menu-item-label'}>{Localize['Portuguese']}</div>
          </div>
        </Button>
      ),
    },
    {
      itemType: 'checkbox',
      onChange: HandleLanguageToggle,
      checked: isDarkTheme,
      content: (
        <Button>
          <div className={'menu-item-content'}>
            <div className={'menu-item-label'}>{Localize['Spanish']}</div>
          </div>
        </Button>
      ),
    },
    {
      itemType: 'checkbox',
      onChange: HandleLanguageToggle,
      checked: isDarkTheme,
      content: (
        <Button>
          <div className={'menu-item-content'}>
            <div className={'menu-item-label'}>{Localize['French']}</div>
          </div>
        </Button>
      ),
    },
  ]

  return (
    <Menu
      items={language ? languageItems : menuItems}
      tooltip={Localize['Settings']}
      placement={'top'}
      className={'menu'}
      disclosure={settingsButton}
      aria-label={'Settings'}
      preventBodyScroll="disable"
    />
  )
}

export default SettingsMenu
