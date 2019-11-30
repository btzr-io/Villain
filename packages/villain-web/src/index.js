import React from 'react'
import ReactDOM from 'react-dom'
import queryString from 'query-string'
import { createPath } from 'history'
import App from './components/app'
import history from '@/history'
import router from './router'

import '@/css/index.css'

const context = { pathname: null, query: null }
const container = document.getElementById('app')

let appInstance
let currentLocation = history.location

const scrollPositionsHistory = {}

// Re-render the app when window.location changes
async function onLocationChange(location, action) {

  // Get route location ( for static location )
  const routePath = location.hash ? location.hash.replace('#/', '/') : location.pathname

  // Remember the latest scroll position for the previous location
  scrollPositionsHistory[currentLocation.key] = {
    scrollX: window.pageXOffset,
    scrollY: window.pageYOffset,
  }

  // Delete stored scroll position for next page if any
  if (action === 'PUSH') {
    delete scrollPositionsHistory[location.key]
  }

  currentLocation = routePath

  const isInitialRender = !action
  try {
    context.pathname = routePath
    context.query = queryString.parse(location.search)
    // Traverses the list of routes in the order they are defined until
    // it finds the first route that matches provided URL path string
    // and whose action method returns anything other than `undefined`.
    const route = await router.resolve(context)

    // Prevent multiple page renders during the routing process
    if (currentLocation.key !== location.key) {
      return
    }

    if (route.redirect) {
      history.replace(route.redirect)
      return
    }

    const renderReactApp = ReactDOM.render

    appInstance = renderReactApp(<App context={context}>{route.component}</App>, container, () => {
      if (isInitialRender) {
        // Switch off the native scroll restoration behavior and handle it manually
        // https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration
        if (window.history && 'scrollRestoration' in window.history) {
          window.history.scrollRestoration = 'manual'
        }

        return
      }

      document.title = route.title

      // Update necessary tags in <head> at runtime here, ie:
      // updateMeta('keywords', route.keywords);
      // updateCustomMeta('og:url', route.canonicalUrl);
      // updateCustomMeta('og:image', route.imageUrl);
      // updateLink('canonical', route.canonicalUrl);
      // etc.

      let scrollX = 0
      let scrollY = 0
      const pos = scrollPositionsHistory[location.key]
      if (pos) {
        scrollX = pos.scrollX
        scrollY = pos.scrollY
      } else {
        const targetHash = location.hash.substr(1)
        if (targetHash) {
          const target = document.getElementById(targetHash)
          if (target) {
            scrollY = window.pageYOffset + target.getBoundingClientRect().top
          }
        }
      }

      // Restore the scroll position if it was saved into the state
      // or scroll to the given #hash anchor
      // or scroll to top of the page
      window.scrollTo(scrollX, scrollY)
    })
  } catch (error) {
    console.error(error)
  }
}

// Handle client-side navigation by using HTML5 History API
// For more information visit https://github.com/mjackson/history#readme
history.listen(onLocationChange)
onLocationChange(currentLocation)

//client.js
if (module.hot) {
  module.hot.accept('./router', () => {
    onLocationChange(currentLocation)
  })
}
