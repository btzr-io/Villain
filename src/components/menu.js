import React, { Fragment } from 'react'
import Icon from '@mdi/react'

/*
  Initial implementation: Useless menu, I'll fix this.
*/

import { useMenuState, Menu, MenuItem, MenuDisclosure, MenuSeparator } from 'reakit/Menu'

import { mdiSettings } from '@mdi/js'

export default function ToolbarMenu() {
  const menu = useMenuState({ placement: 'top-center' })
  return (
    <Fragment>
      <MenuDisclosure {...menu} className={'button button-icon'}>
        <Icon path={mdiSettings} size={'26px'} className={'villain-icon'} />
      </MenuDisclosure>
      <Menu {...menu} aria-label="Preferences" className={'menu'}>
        <MenuItem {...menu} className={'menu-item'} as="div">
          Manga mode
        </MenuItem>
        <MenuItem {...menu} as={'div'} className={'menu-item'}>
          Language
        </MenuItem>
        <MenuItem {...menu} as={'div'} className={'menu-item'}>
          Keyboard shortcuts
        </MenuItem>
      </Menu>
    </Fragment>
  )
}
