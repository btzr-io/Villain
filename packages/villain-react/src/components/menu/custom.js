import React from 'react'
import Icon from '@mdi/react'
import Button from '@/components/toolbar/button'
import Localized from '@/components/localized'

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

export const CustomSeparator = React.forwardRef((props, ref) => (
  <MenuSeparator {...props} ref={ref} className={'villain-menu__separator'} />
))

export const CustomItem = React.forwardRef(({ children, ...props }, ref) => (
  <MenuItem as={Button} className={'villain-menu__item'} {...props} ref={ref}>
    <div className={'villain-menu__item__content'}>
      <div className={'villain-menu__item__label'}>{children}</div>
    </div>
  </MenuItem>
))

export const CustomCheckbox = React.forwardRef(({ children, ...props }, ref) => (
  <MenuItemCheckbox as={Button} {...props} ref={ref}>
    <div className={'villain-menu__item__content'}>
      <div className={'villain-menu__item__label'}>{children}</div>
      <div className={'villain-menu__item__toggler'} />
    </div>
  </MenuItemCheckbox>
))

export const CustomRadio = React.forwardRef(({ children, ...props }, ref) => (
  <MenuItemRadio
    as={Button}
    icon={props.checked ? mdiRadioboxMarked : mdiRadioboxBlank}
    iconSize={'20px'}
    {...props}
    ref={ref}
  >
    <div className={'villain-menu__item__content'}>
      <div className={'villain-menu__item__label'}>{children}</div>
    </div>
  </MenuItemRadio>
))

export const CustomSubmenu = React.forwardRef(({ children, ...props }, ref) => (
  <MenuItem {...props} ref={ref} as={Button}>
    <div className={'villain-menu__item__content'}>
      <div className={'villain-menu__item__label'}>{children}</div>
      <Icon
        path={mdiChevronRight}
        size={'24px'}
        className={'villain-icon villain-menu__item__icon'}
      />
    </div>
  </MenuItem>
))

export const MenuHeader = React.forwardRef(
  ({ title, closeSubmenu, menuProps, ...props }, ref) => {
    return (
      <div {...props} className={'villain-menu__header'}>
        <CustomItem {...menuProps} icon={mdiChevronLeft} onClick={closeSubmenu} ref={ref}>
          <Localized value={title} />
        </CustomItem>
        <CustomSeparator {...menuProps} style={{ margin: 0 }} />
      </div>
    )
  }
)

export const CustomItems = {
  item: React.memo(CustomItem),
  radio: React.memo(CustomRadio),
  submenu: React.memo(CustomSubmenu),
  checkbox: React.memo(CustomCheckbox),
  separator: React.memo(CustomSeparator),
}
