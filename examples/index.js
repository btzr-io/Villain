import React from 'react'
import ReactDOM from 'react-dom'

// Remplace path with build
import Villian from '../src/index.js'
import '../src/css/styles.css'

const villianOpts = {
  workerPath: '/build/libarchive/worker-bundle.js',
}

const testFile =
  'https://raw.githubusercontent.com/workhorsy/uncompress.js/master/example_with_password.zip '

ReactDOM.render(
  <div>
    <h1> Test example! </h1>
    <Villian file={testFile} options={villianOpts} />
  </div>,
  document.getElementById('app')
)
