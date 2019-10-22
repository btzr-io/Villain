import React from 'react'
import ReactDOM from 'react-dom'

// Remplace path with build
import Villain from '@/index.js'
import '@/css/styles.css'

const villainOpts = {
  workerUrl: '/build/worker-bundle.js',
  // Configurations
  preview: 0, // Show all pages
  mangaMode: false,
  allowFullScreen: true,
  autoHideControls: false,
  allowGlobalShortcuts: false,
}

const testFile = '/build/testFile/Example-archive.zip'

ReactDOM.render(
  <div>
    <h1> {'Example test'} </h1>
    <Villain file={testFile} options={villainOpts} width={'800px'} />
  </div>,
  document.getElementById('app')
)
