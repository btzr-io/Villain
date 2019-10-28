import React from 'react'
import './ToggleThemeButton.css'

const ToggleThemeButton = ({ toggleTheme }) => (
  <div className="header">
    <button className="header__button" onClick={e => toggleTheme()}>
      Toggle theme
    </button>
  </div>
)

export default ToggleThemeButton
