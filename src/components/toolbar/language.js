import React, { useState, useContext } from 'react'
import Menu from '@/components/menu'
import Button from '@/components/toolbar/button'
import Localize from '@/localize'
import { ReaderContext } from '@/context'
import { mdiSettings, mdiKeyboard, mdiBrightness4, mdiPagePrevious } from '@mdi/js'

const LanguageMenu = () => {
  const context = useContext(ReaderContext)

  const settingsButton = <Button typeClass={'icon'} icon={mdiSettings} />

  const HandleLanguageToggle = () => {
    // context.updateState(prevState => ({ mangaMode: !prevState.mangaMode }))
  }

  const isDarkTheme = context.state.theme === 'Dark'
  const isMangaMode = context.state.mangaMode

  return (
    <Menu
      items={menuItems}
      tooltip={Localize['Settings']}
      placement={'top'}
      className={'menu'}
      disclosure={settingsButton}
      aria-label={'Settings'}
    />
  )
}

export default LanguageMenu
