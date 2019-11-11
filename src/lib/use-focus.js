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

export const getNestedFocus = parent => {
  const elem = document.activeElement
  const contains = parent.contains(elem)
  const elementType = elem.tagName.toLowerCase()
  const focusableElements = ['input', 'textarea', 'button']
  return contains && focusableElements.indexOf(elementType) !== -1
}
