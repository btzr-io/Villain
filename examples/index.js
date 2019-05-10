import React from 'react'
import ReactDOM from 'react-dom'

// Remplace path with build
import Villain from '../build/villain.js'
import '../src/css/styles.css'

const villainOpts = {
  workerPath: '/build/worker-bundle.js',
}

const testFile =
  'https://raw.githubusercontent.com/workhorsy/uncompress.js/master/example.tar '

ReactDOM.render(
  <div>
    <h1> Test example! </h1>
    <Villain file={testFile} options={villainOpts} />
  </div>,
  document.getElementById('app')
)
