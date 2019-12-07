import React from 'react'
import { render } from 'react-dom'
import deepForceUpdate from 'react-deep-force-update'
import queryString from 'query-string'
import router from '@/router'
import history from '@/history'
import App from './components/app'

import '@/css/index.css'

const context = { pathname: null, query: null }
const container = document.body

let appInstance = null
let currentLocation = history.location

function parseLocation(location) {
  let path = location.hash ? location.hash.replace('#', '') : '/'
  let query = location.search

  if (!query) {
    const parts = path.split('?')
    path = parts[0]
    query = parts[1]
  }

  return { path, query }
}

async function onLocationChange(location, action) {
  const parsed = parseLocation(location)
  context.pathname = parsed.path
  context.query = parsed.query ? queryString.parse(parsed.query) : {}

  // Traverses the list of routes in the order they are defined until
  // it finds the first route that matches provided URL path string
  // and whose action method returns anything other than `undefined`.
  const route = await router.resolve(context)

  // Prevent multiple page renders during the routing process
  /* if (currentLocation.key !== location.key) {
  return;
} */

  if (route.redirect) {
    history.replace(route.redirect)
    return
  }

  appInstance = render(<App context={context}>{route.component}</App>, container)
}

try {
  // Handle client-side navigation by using HTML5 History API
  // For more information visit https://github.com/mjackson/history#readme
  history.listen(onLocationChange)
  onLocationChange(currentLocation)

  // Enable Hot Module Replacement (HMR)
  if (module.hot) {
    module.hot.accept('./router', () => {
      if (appInstance && appInstance.updater.isMounted(appInstance)) {
        // Force-update the whole tree, including components that refuse to update
        deepForceUpdate(appInstance)
      }

      onLocationChange(currentLocation)
    })
  }
} catch (error) {
  console.error(error)
}
