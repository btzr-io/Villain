import React, { Fragment, useEffect, useState, useCallback, useRef } from 'react'
import { useId } from '@/hooks'
import Button from '@/component/controls/button'
import { Icon } from '@mdi/react'

import { mdiPagePreviousOutline } from '@mdi/js'

import { mdiChevronLeft, mdiChevronRight, mdiCheckBold } from '@mdi/js'

function MenuItem({
  ref,
  index,
  value,
  label,
  icon,
  role,
  setCurrentItem,
  setCurrentSubmenu,
  isSubmenu,
  onChange,
  checked = false,
  ...buttonProps
}) {
  const handleFocus = () => {
    setCurrentItem(index)
  }

  const handleClick = (e) => {
    if (isSubmenu) {
      setCurrentSubmenu(index)
    }
    if (role === 'checkbox' || role === 'radio') {
      onChange && onChange(value || label)
    }
  }

  return (
    <Button
      className={'menu-item'}
      role={`menuitem${role}`}
      type={role === 'checkbox' ? 'checkbox' : 'button'}
      aria-checked={role === 'checkbox' ? value : null}
      onClick={handleClick}
      onFocus={handleFocus}
      onMouseOver={handleFocus}
      {...buttonProps}
    >
      <div className="menu-item__label">
        {icon && <Icon path={icon} size={0.9} />}
        <span>{label}</span>
      </div>
      {role === 'checkbox' && <div className="menu-item__toggler" />}
      {isSubmenu && (
        <div className="menu-item__label menu-item__value">
          <span>{value}</span>
          <Icon path={mdiChevronRight} size={0.9} />
        </div>
      )}
      {role === 'radio' && checked && (
        <div>
          <Icon path={mdiCheckBold} size={0.62} />{' '}
        </div>
      )}
    </Button>
  )
}

const Menu = React.forwardRef(({ items, hidden = null, ...props }, ref) => {
  const [lastSubmenu, setLastSubmenu] = useState(-1)
  const [currentSubmenu, setCurrentSubmenu] = useState(-1)
  const [currentItem, setCurrentItem] = useState(0)
  const [isClosed, setIsClosed] = useState(true)
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)
  const panelsRef = useRef(null)
  const [submenuItems, setSubmenuItems] = useState(null)

  const [panelSize, setPanelSize] = useState()
  const [subpanelSize, setSubpanelSize] = useState()

  useEffect(() => {
    if (currentSubmenu === -1) {
      setSubmenuItems(null)
    }

    if (items && items.length) {
      if (
        currentSubmenu > -1 &&
        items[currentSubmenu] &&
        items[currentSubmenu].submenu &&
        items[currentSubmenu].submenu.length
      ) {
        // Set submenu items
        setLastSubmenu(currentSubmenu)
        setSubmenuItems(items[currentSubmenu].submenu)
      }
    }
  }, [items, currentSubmenu, setLastSubmenu])

  const subpanelRef = useCallback(
    (node) => {
      if (!node) {
        setSubpanelSize(null)
      }
      if (node !== null) {
        const size = node.getBoundingClientRect()
        const { width, height } = size
        setSubpanelSize({ width, height })
      }
    },
    [setSubpanelSize]
  )

  const panelRef = useCallback(
    (node) => {
      if (node !== null) {
        const size = node.getBoundingClientRect()
        const { width, height } = size
        setPanelSize({ width, height })
      }
    },
    [setPanelSize, currentSubmenu]
  )

  const handleKeyboard = useCallback(
    (e) => {
      if (event.isComposing || event.keyCode === 229) return
      if (!hidden) {
        // Navigationww
        e.persist()
        if (e.key === 'ArrowLeft' && submenuItems) {
          e.preventDefault()
          // Close submenu
          setCurrentSubmenu(-1)
          return
        }

        const axisY = { ArrowDown: 1, ArrowUp: -1 }

        if (axisY[e.key]) {
          e.preventDefault()
          const total = submenuItems ? submenuItems.length : items.length
          setCurrentItem((prev) => {
            const next = prev + axisY[e.key]

            if (prev === -1 || next === total) return 0
            if (next < 0) return total - 1
            return next
          })
        }
      }
    },
    [setCurrentItem, submenuItems, setCurrentSubmenu, hidden]
  )

  useEffect(() => {
    if (!ref.current) return
    if (hidden) {
      const closeAnimation = ref.current.animate([{ opacity: '0' }], {
        id: 'close-menu',
        fill: 'forwards',
        easing: 'ease-in',
        duration: 250,
      })

      closeAnimation.addEventListener('finish', (event) => {
        setIsClosed(true)
      })
    } else {
      setIsClosed(false)
      setCurrentItem(0)
      const openAnimation = ref.current.animate([{ opacity: '1' }], {
        id: 'open-menu',
        fill: 'forwards',
        easing: 'ease-out',
        duration: 250,
      })
    }
  }, [hidden, ref.current, setIsClosed, setCurrentItem])

  useEffect(() => {
    if (isClosed) {
      // Reset values
      setCurrentItem(-1)
      setCurrentSubmenu(-1)
    }
  }, [isClosed, setCurrentSubmenu, setCurrentItem])

  const size = subpanelSize || panelSize
  const sizeStyles = size ? { width: `${size.width}px`, height: `${size.height}px` } : {}

  const transformStyles =
    panelSize && subpanelSize ? { transform: `translateX(-${panelSize.width}px)` } : {}

  useEffect(() => {
    if (!panelsRef.current || !panelSize) return
    if (subpanelSize) {
      const subpanelOpenAnimation = panelsRef.current.animate(
        [{ transform: `translateX(-${panelSize.width}px)` }],
        {
          id: 'open-submenu',
          fill: 'forwards',
          easing: 'ease',
          duration: 200,
        }
      )

      subpanelOpenAnimation.addEventListener('finish', (event) => {
        setIsSubmenuOpen(true)
      })
    } else {
      const subpanelCloseAnimation = panelsRef.current.animate(
        [{ transform: `translateX(0)` }],
        {
          id: 'close-submenu',
          fill: 'forwards',
          easing: 'ease',
          duration: 200,
        }
      )

      subpanelCloseAnimation.addEventListener('finish', (event) => {
        setIsSubmenuOpen(false)
      })
    }
  }, [panelSize, subpanelSize, setIsSubmenuOpen, panelsRef.current])

  useEffect(() => {
    if (!isSubmenuOpen && lastSubmenu > -1) {
      setCurrentItem(lastSubmenu)
    } else {
      setCurrentItem(0)
    }
  }, [isSubmenuOpen, lastSubmenu, setCurrentItem])

  return (
    <div
      ref={ref}
      className={'menu'}
      role="menu"
      aria-label="Settings"
      aria-orientation="vertical"
      dialog="true"
      hidden={isClosed}
      style={{ ...sizeStyles }}
      onKeyDown={handleKeyboard}
      {...props}
    >
      <div className={'menu-panels'} ref={panelsRef} style={{ ...transformStyles }}>
        <div className={'menu-panel'} ref={panelRef} hidden={currentSubmenu > -1}>
          {items.map(({ submenu, ...itemData }, index) => {
            return (
              <MenuItem
                key={index}
                index={index}
                isSubmenu={submenu && submenu.length > 0}
                tabIndex={hidden || isSubmenuOpen ? -1 : 0}
                focus={!hidden && index === currentItem && !isSubmenuOpen}
                setCurrentItem={setCurrentItem}
                setCurrentSubmenu={setCurrentSubmenu}
                {...itemData}
              />
            )
          })}
        </div>
        {submenuItems && (
          <div
            className={'menu-panel'}
            ref={subpanelRef}
            style={{ left: `${panelSize.width}px` }}
          >
            {submenuItems.map((itemData, index) => (
              <MenuItem
                key={index}
                role="radio"
                index={index}
                tabIndex={isSubmenuOpen ? -1 : 0}
                focus={isSubmenuOpen && index === currentItem}
                checked={
                  isSubmenuOpen &&
                  items[currentSubmenu] &&
                  items[currentSubmenu].value === itemData.label
                }
                onChange={
                  isSubmenuOpen && items[currentSubmenu] && items[currentSubmenu].onChange
                }
                setCurrentItem={setCurrentItem}
                {...itemData}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
})

function MenuButton({ items, ...buttonProps }) {
  const [id] = useId()
  const [open, setOpen] = useState(false)
  const [focusOnClose, setFocusOnclose] = useState(false)
  const [mouseEnter, setMouseEnter] = useState(false)
  const menuRef = useRef(null)

  const handleClickOutside = useCallback(
    (e) => {
      if (mouseEnter) return
      if (e.pointerType === 'touch') {
        if (!menuRef.current) return
        if (!menuRef.current.contains(e.target)) {
          setOpen(false)
          setFocusOnclose(true)
        }
        return
      }
      setOpen(false)
      setFocusOnclose(true)
    },
    [setOpen, setFocusOnclose, mouseEnter, menuRef]
  )

  const handleMouseEnter = useCallback(() => {
    setMouseEnter(true)
  }, [setMouseEnter])

  const handleMouseLeave = useCallback(() => {
    setMouseEnter(false)
  }, [setMouseEnter])

  const close = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        setFocusOnclose(true)
      }
    },
    [setOpen, setFocusOnclose]
  )

  useEffect(() => {
    if (open) {
      setFocusOnclose(false)
      document.addEventListener('keydown', close)
      document.addEventListener('pointerup', handleClickOutside)
    }

    return () => {
      // Cleanup the event listener
      document.removeEventListener('keydown', close)
      document.removeEventListener('pointerup', handleClickOutside)
    }
  }, [open, close, setFocusOnclose, handleClickOutside])

  const handleClick = useCallback(
    (e) => {
      e.preventDefault()
      // Toggle open
      setOpen((prev) => !prev)
    },
    [setOpen]
  )

  const handleKeyboardClick = useCallback(
    (e) => {
      if (e.detail !== 0) return
      setOpen((prev) => !prev)
    },
    [setOpen]
  )

  return (
    <Fragment>
      <Menu
        id={id}
        ref={menuRef}
        items={items}
        hidden={!open}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      <Button
        {...buttonProps}
        onClick={handleKeyboardClick}
        onPointerUp={handleClick}
        focus={focusOnClose}
        aria-haspopup="menu"
        aria-expanded={open}
        controls={id}
      />
    </Fragment>
  )
}

export default MenuButton
