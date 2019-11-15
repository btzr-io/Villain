import React from 'react'
import { MenuHeader } from '@/components/menu/custom'
import { Item, ItemList } from '@/components/menu/item'

import {
  Menu,
  MenuDisclosure,
  Tooltip,
  TooltipReference,
  useTooltipState,
  useMenuState,
} from 'reakit'

const MenuPanel = React.forwardRef(
  ({ title, items, list, openSubmenu, closeSubmenu, menuProps }, ref) => {
    return (
      <div className={'villain-menu__panel'} ref={ref}>
        {title && (
          <MenuHeader menuProps={menuProps} closeSubmenu={closeSubmenu} title={title} />
        )}
        {list ? (
          <ItemList
            {...list}
            title={title}
            menuProps={menuProps}
            closeSubmenu={closeSubmenu}
          />
        ) : (
          items.map(({ nestedTitle, nestedItems, nestedList, ...itemProps }, index) => {
            const itemKey = `${itemProps.itemType || 'item'}-${index}`
            return (
              <Item
                {...menuProps}
                {...itemProps}
                title={title}
                openSubmenu={openSubmenu}
                index={index}
                key={itemKey}
              />
            )
          })
        )}
      </div>
    )
  }
)

const defaultSubmenuState = {
  show: false,
  list: null,
  index: null,
  title: null,
  items: null,
}

const MenuWithTooltip = React.forwardRef(
  ({ disclosure, tooltip, items, placement, ariaLabel, ...props }, ref) => {
    const menu = useMenuState({ placement, gutter: 20 })
    const tooltipState = useTooltipState({ placement })

    const subRef = React.useRef(null)
    const mainRef = React.useRef(null)

    const [menuHeight, setMenuHeight] = React.useState(0)
    const [submenuState, setSubmenuState] = React.useState({ ...defaultSubmenuState })

    const getHeight = element => {
      const bounds = element.getBoundingClientRect()
      return bounds.height
    }

    const reset = () => {
      setSubmenuState({ ...defaultSubmenuState })
    }

    const handleSubmenuOpen = index => {
      setSubmenuState({ index })
    }

    const handleSubmenuClose = () => {
      reset()
    }

    const handleMenuOpen = () => {
      const mainElement = mainRef.current
      mainElement && setMenuHeight(getHeight(mainElement))
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
      if (submenuState.index || submenuState.index === 0) {
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
    }, [submenuState.index, items])

    // Submenu transition
    React.useEffect(() => {
      const subElement = subRef.current
      const mainElement = mainRef.current
      // Submenu open
      if (submenuState.show) {
        subElement && setMenuHeight(getHeight(subElement))
      } else {
        mainElement && setMenuHeight(getHeight(mainElement))
      }
      menu.first()
      menu.unstable_update()
    }, [submenuState.show])

    return (
      <React.Fragment>
        <TooltipReference ref={ref} {...tooltipState} {...props}>
          {referenceProps => (
            <MenuDisclosure {...menu} {...referenceProps}>
              {disclosureProps =>
                React.cloneElement(React.Children.only(disclosure), disclosureProps)
              }
            </MenuDisclosure>
          )}
        </TooltipReference>
        <Tooltip {...tooltipState} className={`villain-tooltip`} unstable_portal={false}>
          {tooltip}
        </Tooltip>
        <Menu
          {...menu}
          style={{ height: menuHeight }}
          className={'villain-menu'}
          aria-label={ariaLabel}
        >
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
        </Menu>
      </React.Fragment>
    )
  }
)

export default MenuWithTooltip
