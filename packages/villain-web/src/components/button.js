import React from 'react'
import history from '@/history'
import clsx from 'clsx'

export default function Button({ navigate, buttonType, onClick, children }) {
  const handleOnclick = () => {
    onClick && onClick()
    navigate && history.push('#' + navigate)
  }
  return (
    <button
      className={clsx('button', buttonType && `button--${buttonType}`)}
      onClick={handleOnclick}
    >
      {children}
    </button>
  )
}
