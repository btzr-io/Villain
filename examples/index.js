import React from 'react'
import ReactDOM from 'react-dom'
import Localization from '@/localize'

// Remplace path with build
import Villain from '@/index.js'
import '@/css/styles.css'

const villainOpts = {
  workerUrl: '/build/worker-bundle.js',
  preview: 4,
  allowFullScreen: true,
  autoHideControls: false,
  mangaMode: false,
}

const testFile = '/build/testFile/Example-archive.zip'

ReactDOM.render(
  <div>
    <h1> {Localization['example.header']} </h1>
    <Villain file={testFile} options={villainOpts} />
  </div>,
  document.getElementById('app')
)
