import React, { useRef } from 'react'

const useFocus = () => {
  const htmlElRef = useRef(null)
  const setFocus = () => {
    if (htmlElRef.current) {
      htmlElRef.current.focus()
      htmlElRef.current.select()
    }
  }
  return [htmlElRef, setFocus]
}

export default useFocus
