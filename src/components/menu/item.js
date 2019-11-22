import React from 'react'
import clsx from 'clsx'
import Icon from '@mdi/react'
import { MenuGroup } from 'reakit'
import { CustomItems } from '@/components/menu/custom'

export const Item = React.memo(
  React.forwardRef(
    ({ id, itemType, content, children, openSubmenu, onClick, ...props }, ref) => {
      const ContainerType = CustomItems[itemType] || CustomItems.item

      const handleClick = e => {
        onClick && onClick(e)
        // Close submenu
        if (itemType === 'submenu') {
          openSubmenu && openSubmenu(id)
        }
      }

      const itemClass = clsx(
        itemType !== 'separator' && 'villain-menu__item',
        itemType && `villain-menu__${itemType}`
      )

      return (
        <ContainerType onClick={handleClick} className={itemClass} {...props} ref={ref}>
          {content || children}
        </ContainerType>
      )
    }
  )
)

export const ItemList = React.memo(
  ({ title, items, getProps, menuProps, getContent, closeSubmenu }) => {
    return (
      <MenuGroup {...menuProps}>
        {items.map((item, index) => (
          <Item
            {...menuProps}
            {...React.useMemo(() => getProps({ item, closeSubmenu, title }), [
              item,
              title,
              closeSubmenu,
            ])}
            key={item}
          >
            {React.useMemo(() => getContent(item), [item])}
          </Item>
        ))}
      </MenuGroup>
    )
  }
)
