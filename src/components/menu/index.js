import React from 'react'
import { Tooltip, TooltipReference, useTooltipState } from 'reakit/Tooltip'
import { MenuHeader } from '@/components/menu/custom'
import { Item, ItemList } from '@/components/menu/item'
import { Menu, MenuDisclosure, useMenuState } from 'reakit/Menu'

const MenuPanel = React.forwardRef(
  ({ title, items, list, openSubmenu, closeSubmenu, menuProps }, ref) => {
    return (
      <div className={'menu--panel'} ref={ref}>
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

    const [height, setHeight] = React.useState(0)
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
      mainElement && setHeight(getHeight(mainElement))
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
        subElement && setHeight(getHeight(subElement))
      } else {
        mainElement && setHeight(getHeight(mainElement))
      }
      menu.first()
    }, [submenuState.show])
    // Hanlde size updates
    React.useEffect(() => {
      height && menu.unstable_update()
    }, [height])

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
        <Tooltip {...tooltipState} className={`tooltip-villain`} unstable_portal={false}>
          {tooltip}
        </Tooltip>
        <Menu
          {...menu}
          className={'menu'}
          aria-label={ariaLabel}
          style={{ height: `${height}px` }}
        >
          <div className={'menu--animated-content'}>
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
      </React.Fragment>
    )
  }
)

export default MenuWithTooltip
