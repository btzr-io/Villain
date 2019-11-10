import React from 'react'
import clsx from 'clsx'

import {
  MenuItem,
  MenuGroup,
  MenuSeparator,
  MenuItemRadio,
  MenuItemCheckbox,
  useMenuState,
} from 'reakit/Menu'

const ContainerTypes = {
  item: MenuItem,
  radio: MenuItemRadio,
  checkbox: MenuItemCheckbox,
  separator: MenuSeparator,
}

export function Item({ index, itemType, children, openSubmenu, ...props }) {
  const ContainerType = ContainerTypes[itemType] || ContainerTypes.item

  const handleClick = () => {
    if (itemType === 'submenu') {
      openSubmenu && openSubmenu(index)
    }
  }

  const itemClass = clsx(
    itemType !== 'separator' && 'menu-item',
    itemType && `menu-${itemType}`
  )

  return (
    <ContainerType onClick={handleClick} {...props} className={itemClass}>
      {children}
    </ContainerType>
  )
}

export function ItemList({
  menuProps,
  closeSubmenu,
  items,
  getProps,
  getContent,
  name,
  listType,
}) {
  return (
    <MenuGroup {...menuProps}>
      {items.map((item, index) => (
        <Item
          {...menuProps}
          {...getProps(item, index, closeSubmenu)}
          key={`${item}-${index}`}
        >
          {props => getContent(item, index, props)}
        </Item>
      ))}
    </MenuGroup>
  )
}
