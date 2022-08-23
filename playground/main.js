import React from 'react'
import ReactDOM from 'react-dom'
import { Villain } from '@/main.js'

import './styles.css'

let root = document.querySelector('#app')

ReactDOM.render(
  <React.Fragment>
    <Villain />
  </React.Fragment>,
  root
)
