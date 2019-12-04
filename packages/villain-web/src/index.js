import React from 'react'
import ReactDOM from 'react-dom'
import queryString from 'query-string'
import App from './components/app'

import '@/css/index.css'

const context = { pathname: null, query: null }
const container = document.body

try {
  context.query = queryString.parse(location.search)
  console.info(context)
  ReactDOM.render(<App context={context} />, container)
} catch (error) {
  console.error(error)
}
