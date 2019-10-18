import React from 'react'
import ReactDOM from 'react-dom'

// Remplace path with build
import Villain from '../src/index.js'
import '../src/css/styles.css'

const villainOpts = {
  workerUrl: '/build/worker-bundle.js',
  allowFullScreen: false,
}

const testFile = '/build/testFile/Example-archive.zip'

ReactDOM.render(
  <div>
    <h1> Test example! </h1>
    <Villain file={testFile} options={villainOpts} />
  </div>,
  document.getElementById('app')
)
