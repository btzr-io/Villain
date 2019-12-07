/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable global-require */

// The top-level (parent) route
const routes = {
  path: '',

  // Keep in mind, routes are evaluated in order
  children: [
    {
      path: '/',
      load: () => import(/* webpackChunkName: 'home' */ '@/routes/home'),
    },
    {
      path: '/embed',
      load: () => import(/* webpackChunkName: 'embed' */ '@/routes/embed'),
    },
    {
      path: '/reader',
      load: () => import(/* webpackChunkName: 'reader' */ '@/routes/reader'),
    },
    {
      path: '(.*)',
      load: () => import(/* webpackChunkName: 'error' */ '@/routes/error'),
    },
  ],

  async action({ next }) {
    // Execute each child route until one of them return the result
    const route = await next()

    // Provide default values for title, description etc.
    route.title = `${route.title || 'Untitled Page'} - www.reactstarterkit.com`
    route.description = route.description || ''

    return route
  },
}

export default routes
