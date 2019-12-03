import React from 'react'
import Villain from 'villain-react'
import 'villain-react/dist/style.css'

export default function Reader({ source }) {
  const [options, setOptions] = React.useState({
    theme: 'Light',
    maxPages: 100,
    mangaMode: false,
    allowFullScreen: true,
    autoHideControls: false,
    allowGlobalShortcuts: false,
  })

  return (
    <Villain
      style={{ width: '100%', height: '100%' }}
      source={source}
      options={options}
      workerUrl={'static/worker-bundle.js'}
    />
  )
}
