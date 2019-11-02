import React from 'react'
import ReactDOM from 'react-dom'

import { Tooltip, TooltipReference, useTooltipState } from 'reakit/Tooltip'

import {
  Menu,
  MenuItem,
  MenuGroup,
  MenuSeparator,
  MenuDisclosure,
  MenuItemCheckbox,
  useMenuState,
  useMenuItemCheckbox,
} from 'reakit/Menu'

import { useCheckboxState } from 'reakit'

const ContainerTypes = {
  item: MenuItem,
  checkbox: MenuItemCheckbox,
  separator: MenuSeparator,
}

function Item({ itemType, children, ...props }) {
  const ContainerType = ContainerTypes[itemType] || ContainerTypes.item
  const classType = itemType ? `menu-${itemType}` : 'menu-item'
  return (
    <ContainerType {...props} className={classType}>
      {children}
    </ContainerType>
  )
}

const MenuWithTooltip = React.forwardRef(
  ({ disclosure, tooltip, items, placement, ariaLabel, ...props }, ref) => {
    const menu = useMenuState({ placement })
    const tooltipState = useTooltipState({ placement })

    return (
      <>
        <TooltipReference ref={ref} {...tooltipState} {...props}>
          {referenceProps => (
            <MenuDisclosure {...menu} {...referenceProps}>
              {disclosureProps =>
                React.cloneElement(React.Children.only(disclosure), disclosureProps)
              }
            </MenuDisclosure>
          )}
        </TooltipReference>
        <Tooltip {...tooltipState} className={`tooltip-villain`} unstable_portal={false}>
          {tooltip}
        </Tooltip>
        <Menu {...menu} className={'menu'} aria-label={ariaLabel}>
          {items.map(({ content, ...itemProps }, i) => (
            <Item {...menu} {...itemProps} key={i}>
              {itemProps => React.cloneElement(React.Children.only(content), itemProps)}
            </Item>
          ))}
        </Menu>
      </>
    )
  }
)

export default MenuWithTooltip
