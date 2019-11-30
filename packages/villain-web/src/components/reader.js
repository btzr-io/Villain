import React from 'react'
import Villain from 'villain-react'
import 'villain-react/dist/style.css'
export default function Reader(props) {
  const [file, setFile] = React.useState('static/archives/example.zip')

  const { src } = props.query

  const [options, setOptions] = React.useState({
    maxPages: 100,
    mangaMode: false,
    allowFullScreen: true,
    autoHideControls: false,
    allowGlobalShortcuts: false,
  })

  console.info(props)
  return (
    <Villain
      style={{ width: '100%', height: '100%' }}
      source={src || file}
      options={options}
      workerUrl={'static/worker-bundle.js'}
    />
  )
}
