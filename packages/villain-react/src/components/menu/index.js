import React from 'react'
import { MenuHeader } from '@/components/menu/custom'
import { Item, ItemList } from '@/components/menu/item'
import { animated, useSpring } from 'react-spring'

import { Menu, MenuDisclosure, useMenuState } from 'reakit'

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
          items &&
          items.map(({ nestedTitle, nestedItems, nestedList, ...itemProps }) => {
            return (
              <Item
                {...menuProps}
                {...itemProps}
                key={itemProps.id}
                title={title}
                openSubmenu={openSubmenu}
              />
            )
          })
        )}
      </div>
    )
  }
)

const PureMenuPanel = React.memo(MenuPanel)

const defaultSubmenuState = {
  id: null,
  list: null,
  title: null,
  items: null,
  visible: false,
}

const BaseMenu = React.forwardRef(
  ({ disclosure, tooltip, items, placement, ariaLabel, forceClose, ...props }, ref) => {
    const menu = useMenuState({ placement, gutter: 20, unstable_animated: true })
    const subRef = React.useRef(null)
    const mainRef = React.useRef(null)

    const [menuHeight, setMenuHeight] = React.useState(0)
    const [submenuState, setSubmenuState] = React.useState(defaultSubmenuState)
    const [animationState, setAnimationState] = React.useState(false)

    const maxHeight = 240

    const reset = () => {
      setSubmenuState({ ...defaultSubmenuState })
    }

    const handleSubmenuOpen = id => {
      setSubmenuState({ ...submenuState, id })
    }

    const handleSubmenuClose = () => {
      reset()
    }

    const handleMenuClose = () => {
      reset()
    }

    const handleAnimationStart = () => {
      setAnimationState(true)
    }

    const handleAnimationRest = () => {
      setAnimationState(false)
      menu.unstable_stopAnimation()
    }

    const [menuAnimatedProps, updateMenuSpring, stopMenuSpring] = useSpring(() => ({
      height: `${menuHeight}px`,
      opacity: 0,
      onRest: handleAnimationRest,
      onStart: handleAnimationStart,
      config: { clamp: true, velocity: 5, friction: 20 },
    }))

    React.useEffect(() => {
      // Animated height
      updateMenuSpring({ height: `${menuHeight}px` })
    }, [menuHeight])

    // Handle menu
    React.useEffect(() => {
      if (menu.visible && mainRef.current !== null) {
        // In rare cases like on electron, this will be executed before the menu
        // is truly visible, so height will always be equal to "0px"
        // - Todo: Find a better solution for this!
        setTimeout(() => {
          const mainElementHeight = mainRef.current.clientHeight
          const nextHeight = mainElementHeight > maxHeight ? maxHeight : mainElementHeight
          setMenuHeight(nextHeight)
          menu.unstable_update()
        }, 100)
      }

      // Animated opacity
      updateMenuSpring({ opacity: menu.visible ? 1 : 0 })
    }, [menu.visible])

    // Handle parent close
    React.useEffect(() => {
      if (forceClose) {
        menu.hide()
      }
    }, [forceClose])

    React.useEffect(() => {
      if (!animationState && !menu.visible) {
        handleMenuClose()
      }
    }, [animationState])

    // Handle submenu
    React.useEffect(() => {
      // Update submenu content
      if (submenuState.id) {
        // Check if selected iteam exist
        const selected =
          items && items.length > 0 && items.find(item => item.id === submenuState.id)

        if (selected) {
          // Contains a list of similar items
          const hasNestedList =
            selected.nestedList &&
            selected.nestedList.items &&
            selected.nestedList.items.length > 0

          // Contains items
          const hasNestedItems = selected.nestedItems && selected.nestedItems.length > 0

          // Validate state update
          const visible = hasNestedList || hasNestedItems

          // Update submenu state and show it
          if (visible) {
            setSubmenuState({
              ...submenuState,
              visible: true,
              list: hasNestedList ? selected.nestedList : null,
              items: hasNestedItems ? selected.nestedItems : null,
              title: selected.nestedTitle,
            })
          }
        }
      }
    }, [submenuState.id])

    // Submenu transition
    React.useEffect(() => {
      // Submenu open
      if (submenuState.visible && subRef.current) {
        const subElementHeight = subRef.current.clientHeight
        const nextHeight = subElementHeight > maxHeight ? maxHeight : subElementHeight

        if (menuHeight !== nextHeight) {
          setMenuHeight(nextHeight)
        }
      }

      // Submenu close
      if (!submenuState.visible && mainRef.current) {
        const mainElementHeight = mainRef.current.clientHeight
        const nextHeight = mainElementHeight > maxHeight ? maxHeight : mainElementHeight

        if (menuHeight !== nextHeight) {
          setMenuHeight(nextHeight)
        }
      }
      menu.unstable_update()
    }, [submenuState.visible])

    return (
      <React.Fragment>
        <MenuDisclosure {...props} {...menu} as={disclosure} ref={ref} />
        <Menu
          {...menu}
          style={{ height: menuHeight }}
          className={'villain-menu'}
          aria-label={ariaLabel}
        >
          <animated.div
            style={menuAnimatedProps}
            data-animation={animationState}
            className={'villain-menu__animated-content'}
          >
            {!submenuState.visible ? (
              <PureMenuPanel
                menuProps={menu}
                items={items}
                openSubmenu={handleSubmenuOpen}
                closeSubmenu={handleSubmenuClose}
                ref={mainRef}
              />
            ) : (
              <PureMenuPanel
                menuProps={menu}
                list={submenuState.list}
                title={submenuState.title}
                items={submenuState.items}
                openSubmenu={handleSubmenuOpen}
                closeSubmenu={handleSubmenuClose}
                ref={subRef}
              />
            )}
          </animated.div>
        </Menu>
      </React.Fragment>
    )
  }
)

export default React.memo(BaseMenu)
