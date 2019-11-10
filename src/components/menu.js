import React from 'react'
import clsx from 'clsx'
import { Tooltip, TooltipReference, useTooltipState } from 'reakit/Tooltip'

import Button from '@/components/toolbar/button'

import { mdiChevronLeft } from '@mdi/js'

import {
  Menu,
  MenuItem,
  MenuGroup,
  MenuItemRadio,
  MenuSeparator,
  MenuDisclosure,
  MenuItemCheckbox,
  useMenuState,
  useMenuItemCheckbox,
} from 'reakit/Menu'

import { useCheckboxState } from 'reakit'

const ContainerTypes = {
  item: MenuItem,
  radio: MenuItemRadio,
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

const ItemList = ({
  menuProps,
  closeSubmenu,
  items,
  getProps,
  getContent,
  name,
  listType,
}) => {
  return (
    <MenuGroup {...menuProps}>
      {items.map((item, index) => (
        <Item {...menuProps} {...getProps(item, index, closeSubmenu)} key={index}>
          {props => getContent(item, index, props)}
        </Item>
      ))}
    </MenuGroup>
  )
}

const MenuHeader = ({ menuProps, closeSubmenu, title }) => {
  const itemProps = {
    onClick: closeSubmenu,
  }

  const content = (
    <Button icon={mdiChevronLeft}>
      <div className={'menu-item-content'}>{title}</div>
    </Button>
  )

  return (
    <div className={'menu-header'}>
      <Item {...menuProps} {...itemProps}>
        {props => React.cloneElement(React.Children.only(content), props)}
      </Item>
      <MenuSeparator className={'menu-separator'} as={'div'} style={{ margin: 0 }} />
    </div>
  )
}

const MenuPanel = React.forwardRef(
  ({ title, items, list, openSubmenu, closeSubmenu, menuProps }, ref) => {
    return (
      <div className={'menu--panel'} ref={ref}>
        {title && (
          <MenuHeader menuProps={menuProps} closeSubmenu={closeSubmenu} title={title} />
        )}
        {list ? (
          <ItemList
            menuProps={menuProps}
            {...list}
            name={title}
            closeSubmenu={closeSubmenu}
          />
        ) : (
          items.map(
            ({ content, nestedTitle, nestedItems, nestedList, ...itemProps }, i) => (
              <Item
                {...menuProps}
                {...itemProps}
                openSubmenu={openSubmenu}
                index={i}
                key={i}
              >
                {props => React.cloneElement(React.Children.only(content), props)}
              </Item>
            )
          )
        )}
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
      list: null,
      index: null,
      items: null,
      title: null,
    })
    const getHeight = element => {
      const bounds = element.getBoundingClientRect()
      return bounds.height
    }

    const reset = () => {
      setSubmenuState({ show: false, index: null, items: null, title: null, list: null })
    }

    const handleSubmenuOpen = index => {
      setSubmenuState({ index })
    }

    const handleSubmenuClose = () => {
      reset()
    }

    const handleMenuOpen = () => {
      reset()
      setHeight(getHeight(mainRef.current))
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
        // Check if selected iteam exist
        const selected = items[submenuState.index]

        if (selected) {
          // Contains a list of similar items
          const hasNestedList =
            selected.nestedList &&
            selected.nestedList.items &&
            selected.nestedList.items.length > 0

          // Contains items
          const hasNestedItems = selected.nestedItems && selected.nestedItems.length > 0

          // Validate state update
          const show = hasNestedList || hasNestedItems

          // Update submenu state and show it
          if (show) {
            setSubmenuState({
              show,
              list: hasNestedList ? selected.nestedList : null,
              items: hasNestedItems ? selected.nestedItems : null,
              title: selected.nestedTitle,
            })
          }
        }
      }
    }, [submenuState.index])

    // Submenu transition
    React.useEffect(() => {
      const subElement = subRef.current
      const mainElement = mainRef.current
      // Submenu open
      if (submenuState.show) {
        subElement && setHeight(getHeight(subElement))
      } else {
        mainElement && setHeight(getHeight(mainElement))
      }

      menu.first()
    }, [submenuState.show])

    // Hanlde size updates
    React.useEffect(() => {
      if (height) {
        menu.unstable_update()
      }
    }, [height])

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
          className={clsx('menu')}
          aria-label={ariaLabel}
          style={{ height: `${height}px` }}
        >
          <div className={'menu--animated-content'} style={{ height: height + 'px' }}>
            {!submenuState.show ? (
              <MenuPanel
                menuProps={menu}
                items={items}
                openSubmenu={handleSubmenuOpen}
                closeSubmenu={handleSubmenuClose}
                ref={mainRef}
              />
            ) : (
              <MenuPanel
                menuProps={menu}
                list={submenuState.list}
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
