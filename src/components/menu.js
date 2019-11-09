import React from 'react'
import clsx from 'clsx'
import { Tooltip, TooltipReference, useTooltipState } from 'reakit/Tooltip'

import Button from '@/components/toolbar/button'

import { mdiChevronLeft } from '@mdi/js'

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

function Item({ index, itemType, children, openSubmenu, ...props }) {
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

const MenuHeader = ({ menuProps, closeSubmenu, title }) => {
  const itemProps = {
    itemType: 'item',
    onClick: closeSubmenu,
  }

  const content = (
    <Button icon={mdiChevronLeft}>
      <div className={'menu-item-content'}>{title}</div>
    </Button>
  )

  return (
    <Item {...menuProps} {...itemProps}>
      {props => React.cloneElement(React.Children.only(content), props)}
    </Item>
  )
}

const MenuPanel = React.forwardRef(
  ({ title, items, openSubmenu, closeSubmenu, menuProps }, ref) => {
    return (
      <div className={'menu--panel'} ref={ref}>
        {title && (
          <MenuHeader menuProps={menuProps} closeSubmenu={closeSubmenu} title={title} />
        )}
        {items.map(({ content, nestedTitle, nestedItems, ...itemProps }, i) => (
          <Item {...menuProps} {...itemProps} openSubmenu={openSubmenu} index={i} key={i}>
            {props => React.cloneElement(React.Children.only(content), props)}
          </Item>
        ))}
      </div>
    )
  }
)

const MenuWithTooltip = React.forwardRef(
  ({ disclosure, tooltip, items, placement, ariaLabel, ...props }, ref) => {
    const menu = useMenuState({ placement })
    const tooltipState = useTooltipState({ placement })

    const subRef = React.useRef(null)
    const mainRef = React.useRef(null)

    const [height, setHeight] = React.useState(0)
    const [submenuState, setSubmenuState] = React.useState({
      show: false,
      index: null,
      items: null,
      title: null,
    })
    const getHeight = element => {
      const bounds = element.getBoundingClientRect()
      return bounds.height
    }

    const reset = () => {
      setSubmenuState({ show: false, index: null, items: null, title: null })
      setHeight(getHeight(mainRef.current))
    }

    const handleSubmenuOpen = index => {
      setSubmenuState({ index })
    }

    const handleSubmenuClose = () => {
      reset()
    }

    const handleMenuOpen = () => {
      reset()
    }

    const handleMenuClose = () => {
      reset()
    }

    // Handle menu
    React.useEffect(() => {
      // On menu open
      if (menu.visible) {
        handleMenuOpen()
      } else {
        // On menu close
        handleMenuClose()
      }
    }, [menu.visible])

    // Handle submenu
    React.useEffect(() => {
      // Update submenu content
      if (submenuState.index && submenuState.index > -1) {
        const selected = items[submenuState.index]
        if (selected && selected.nestedItems && selected.nestedItems.length > 0) {
          setSubmenuState({
            show: true,
            items: selected.nestedItems,
            title: selected.nestedTitle,
          })
        }
      }
    }, [submenuState.index])

    // Submenu transition
    React.useEffect(() => {
      // Submenu open
      if (submenuState.show) {
        setHeight(getHeight(subRef.current))
      }
    }, [submenuState.show])

    // Hanlde size updates
    React.useEffect(() => {
      menu.unstable_update()
    }, [height])

    const translateX = submenuState.show ? '-50%' : 0

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
        <Menu
          {...menu}
          className={'menu'}
          aria-label={ariaLabel}
          style={{ height: `${height}px` }}
        >
          <div
            className={'menu--slider'}
            style={{ transform: `translate3d(${translateX}, 0 , 0)` }}
          >
            <MenuPanel
              menuProps={menu}
              items={items}
              openSubmenu={handleSubmenuOpen}
              closeSubmenu={handleSubmenuClose}
              ref={mainRef}
            />

            {submenuState.show && (
              <MenuPanel
                menuProps={menu}
                title={submenuState.title}
                items={submenuState.items}
                openSubmenu={handleSubmenuOpen}
                closeSubmenu={handleSubmenuClose}
                ref={subRef}
              />
            )}
          </div>
        </Menu>
      </>
    )
  }
)

export default MenuWithTooltip
