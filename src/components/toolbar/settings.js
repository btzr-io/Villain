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

  const handleThemeToggle = () => {
    context.updateState(prevState => ({
      theme: prevState.theme === 'Dark' ? 'Light' : 'Dark',
    }))
  }

  const handleMangaToggle = () => {
    context.updateState(prevState => ({ mangaMode: !prevState.mangaMode }))
  }

  const handleLanguageChange = (language) => {
    context.updateState({ language })
  }

  const isDarkTheme = context.state.theme === 'Dark'
  const isMangaMode = context.state.mangaMode

  const menuItems = [
    {
      itemType: 'checkbox',
      onChange: handleMangaToggle,
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
      onChange: handleThemeToggle,
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
      nestedList: {
        listType: 'radio',
        items: Localize.getAvailableLanguages(),
        getProps: (item, index, closeSubmenu ) => {
            return {
              name,
              value: item,
              itemType: 'radio',
              checked: Localize.getLanguage() === item,
              onClick: closeSubmenu,
              onChange: () => handleLanguageChange(item),
            }
          },
          getContent: (item, index, props) => (<Button {...props} key={index}>
              <div className={'menu-item-content'}>{item}</div>
            </Button>),
      },
    },
    {
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
