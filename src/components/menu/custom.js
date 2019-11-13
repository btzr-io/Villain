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
  <MenuSeparator {...props} className={'villain-menu__separator'} />
)

export const CustomItem = ({ children, ...props }) => (
  <MenuItem as={Button} className={'villain-menu__item'} {...props}>
    <div className={'villain-menu__item__content'}>
      <div className={'villain-menu__item__label'}>{children}</div>
    </div>
  </MenuItem>
)

export const CustomCheckbox = ({ children, ...props }) => (
  <MenuItemCheckbox as={Button} {...props}>
    <div className={'villain-menu__item__content'}>
      <div className={'villain-menu__item__label'}>{children}</div>
      <div className={'villain-menu__item__toggler'} />
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
    <div className={'villain-menu__item__content'}>
      <div className={'villain-menu__item__label'}>{children}</div>
    </div>
  </MenuItemRadio>
)

export const CustomSubmenu = ({ children, ...props }) => (
  <MenuItem {...props} as={Button}>
    <div className={'villain-menu__item__content'}>
      <div className={'villain-menu__item__label'}>{children}</div>
      <Icon
        path={mdiChevronRight}
        size={'24px'}
        className={'villain-icon villain-menu__item__icon'}
      />
    </div>
  </MenuItem>
)

export const MenuHeader = ({ title, closeSubmenu, menuProps, ...props }) => {
  return (
    <div {...props} className={'villain-menu__header'}>
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
