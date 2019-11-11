import React from 'react'
import Icon from '@mdi/react'
import Button from '@/components/toolbar/button'

import {
  MenuItem,
  MenuSeparator,
  MenuItemRadio,
  MenuItemCheckbox,
  useMenuState,
} from 'reakit'

import {
  mdiChevronLeft,
  mdiChevronRight,
  mdiRadioboxBlank,
  mdiRadioboxMarked,
} from '@mdi/js'

export const CustomSeparator = props => (
  <MenuSeparator {...props} className={'menu-separator'} />
)

export const CustomItem = ({ children, ...props }) => (
  <MenuItem as={Button} className={'menu-item'} {...props}>
    <div className={'menu-item-content'}>
      <div className={'mneu-item-label'}>{children}</div>
    </div>
  </MenuItem>
)

export const CustomCheckbox = ({ children, ...props }) => (
  <MenuItemCheckbox as={Button} {...props}>
    <div className={'menu-item-content'}>
      <div className={'mneu-item-label'}>{children}</div>
      <div className={'menu-item-toggler'} />
    </div>
  </MenuItemCheckbox>
)

export const CustomRadio = ({ children, ...props }) => (
  <MenuItemRadio
    as={Button}
    icon={props.checked ? mdiRadioboxMarked : mdiRadioboxBlank}
    iconSize={'20px'}
    {...props}
  >
    <div className={'menu-item-content'}>
      <div className={'mneu-item-label'}>{children}</div>
    </div>
  </MenuItemRadio>
)

export const CustomSubmenu = ({ children, ...props }) => (
  <MenuItem {...props} as={Button}>
    <div className={'menu-item-content'}>
      <div className={'menu-item-label'}>{children}</div>
      <Icon
        path={mdiChevronRight}
        size={'24px'}
        className={'villain-icon menu-item-icon'}
      />
    </div>
  </MenuItem>
)

export const MenuHeader = ({ title, closeSubmenu, menuProps, ...props }) => {
  return (
    <div {...props} className={'menu-header'}>
      <CustomItem {...menuProps} icon={mdiChevronLeft} onClick={closeSubmenu}>
        {title}
      </CustomItem>
      <CustomSeparator {...menuProps} style={{ margin: 0 }} />
    </div>
  )
}

export const CustomItems = {
  item: CustomItem,
  radio: CustomRadio,
  submenu: CustomSubmenu,
  checkbox: CustomCheckbox,
  separator: CustomSeparator,
}
