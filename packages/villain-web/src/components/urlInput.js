import React from 'react'
import Icon from '@mdi/react'
import { mdiArrowRightThick } from '@mdi/js'

export default function UrlInput({ onChange, onSubmit, submit }) {
  const [value, setValue] = React.useState('')

  const handleChange = React.useCallback(
    e => {
      const { value } = e.target
      // Internal update
      setValue(value)
      // External handler
      if (onChange) {
        onChange(value)
      }
    },
    [onChange]
  )

  const handleKey = React.useCallback(
    e => {
      if (e.key === 'Enter') {
        onSubmit && onSubmit(value)
      }
    },
    [value, onSubmit]
  )

  const handleClick = React.useCallback(
    e => {
      onSubmit && onSubmit(value)
    },
    [value, onSubmit]
  )

  return (
    <div className="url-input">
      <input
        id="url"
        type="url"
        name="url"
        value={value}
        onKeyPress={handleKey}
        onChange={handleChange}
        className="input"
        pattern="https://.*"
        placeholder="http://example.com/files/archive.cbz"
      />
      {submit && (
        <button className={'button button--icon'} onClick={handleClick}>
          <Icon
            className="footer__icon"
            aria-label="love"
            path={mdiArrowRightThick}
            size={0.8}
            color="currentColor"
          />
        </button>
      )}
    </div>
  )
}
