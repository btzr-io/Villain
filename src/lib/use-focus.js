import React, { useRef } from 'react'

export const useFocus = () => {
  const htmlElRef = useRef(null)
  const setFocus = () => {
    if (htmlElRef.current) {
      htmlElRef.current.focus()
      htmlElRef.current.select()
    }
  }
  return [htmlElRef, setFocus]
}

// Detects is any chilkd of parent has focusableElements
export const getNestedFocus = parent => {
  const elem = document.activeElement
  return parent.contains(elem)
}

// Detects if user is typing or interacting with buttons or menus:
// Useful for handling keyboard shortcuts
export const getInteractionFocus = () => {
  const activeElement = document.activeElement
  if (activeElement) {
    const focusableElements = ['BUTTON', 'INPUT', 'TEXTAREA']
    return focusableElements.includes(activeElement.tagName)
  }
}
