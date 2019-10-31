import React, { useState, useContext } from "react";
//import Button from '@/components/toolbar/button'
import { mdiSettings } from '@mdi/js'
import  Button  from '@/components/toolbar/button'
import Menu from '@/components/menu'
import { ReaderContext } from '@/context'

import { mdiKeyboard, mdiBrightness4, mdiPagePrevious } from '@mdi/js';

const SettingsMenu = () => {
  const context = useContext(ReaderContext);

  const settingsButton = <Button typeClass={'icon'} icon={mdiSettings} />


  const HandleThemeToggle = () => {
    context.updateState(prevState =>  ({ theme: prevState.theme === 'Dark' ? 'Light' : 'Dark'}))
  }

  const HandleMangaToggle = () => {
    context.updateState(prevState =>  ({ mangaMode: !prevState.mangaMode }))
  }

  const isDarkTheme = context.state.theme === "Dark"
  const isMangaMode = context.state.mangaMode

  const menuItems = [{
    itemType: 'checkbox',
    onChange: HandleMangaToggle,
    checked: isMangaMode,
    content: (
      <Button icon={mdiPagePrevious}>
        <div className={'menu-item-content'}>
        <div className={'mneu-item-label'}>{ "Manga mode" }</div>
        <div className={'menu-item-toggler'}/>
        </div>
      </Button>),
  },{
    itemType: 'checkbox',
    onChange: HandleThemeToggle,
    checked: isDarkTheme,
    content: (
      <Button icon={mdiBrightness4}>
      <div className={'menu-item-content'}>
        <div className={'menu-item-label'}>{"Dark theme"}</div>
        <div className={'menu-item-toggler'}/>
        </div>
      </Button>
    ),
  },
  { itemType: 'separator', content: (<hr/>) },
  {
    itemType: 'item',
    content: (<Button icon={mdiKeyboard}><div className={'menu-item-content'}>{ "Keyboard shortcuts" }</div></Button>),
  },
]


  return(
    <Menu
    items={menuItems}
    tooltip={'Settings'}
    placement={'top'}
    className={'menu'}
    disclosure={settingsButton}
    aria-label={'Settings'}
    />
  )
}


export default SettingsMenu
