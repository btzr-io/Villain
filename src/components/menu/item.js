import React from 'react'
import clsx from 'clsx'
import Icon from '@mdi/react'
import { MenuGroup } from 'reakit/Menu'
import { CustomItems } from '@/components/menu/custom'

export function Item({
  index,
  itemType,
  content,
  children,
  openSubmenu,
  onClick,
  ...props
}) {
  const ContainerType = CustomItems[itemType] || CustomItems.item

  const handleClick = e => {
    onClick && onClick(e)
    // Close submenu
    if (itemType === 'submenu') {
      openSubmenu && openSubmenu(index)
    }
  }

  const itemClass = clsx(
    itemType !== 'separator' && 'menu-item',
    itemType && `menu-${itemType}`
  )

  return (
    <ContainerType onClick={handleClick} className={itemClass} {...props}>
      {content || children}
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
          {getContent(item)}
        </Item>
      ))}
    </MenuGroup>
  )
}
