import React from 'react'
import clsx from 'clsx'
import Icon from '@mdi/react'
import { MenuGroup } from 'reakit'
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
    itemType !== 'separator' && 'villain-menu__item',
    itemType && `villain-menu__${itemType}`
  )

  return (
    <ContainerType onClick={handleClick} className={itemClass} {...props}>
      {content || children}
    </ContainerType>
  )
}

export function ItemList({
  title,
  items,
  getProps,
  menuProps,
  getContent,
  closeSubmenu,
}) {
  return (
    <MenuGroup {...menuProps}>
      {items.map((item, index) => (
        <Item
          {...menuProps}
          {...getProps({ item, index, closeSubmenu, title })}
          key={`${item}-${index}`}
        >
          {getContent(item)}
        </Item>
      ))}
    </MenuGroup>
  )
}
