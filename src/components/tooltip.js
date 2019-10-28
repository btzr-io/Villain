import React, { useState, useEffect } from 'react'

const Tooltip = ({ text, overrideClass = '', children, style }) => {
  const [hover, setHover] = useState(false)
  let clearDelay = null

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const onMouseEnter = () => {
    clearTimeout(clearDelay)

    clearDelay = setTimeout(() => {
      setHover(true)
    }, 600)
  }

  const onMouseLeave = () => {
    clearTimeout(clearDelay)
    setHover(false)
  }

  const handleKeyDown = () => {
    clearTimeout(clearDelay)
    setHover(false)
  }

  return (
    <div style={{ position: 'relative', ...style }}>
      <div
        className={`tooltip-con ${overrideClass}`}
        style={{ display: hover ? 'block' : 'none' }}
      >
        <span className="tooltip-text">{text}</span>
      </div>
      <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {children}
      </div>
    </div>
  )
}

export default React.memo(Tooltip)
