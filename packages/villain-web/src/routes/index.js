const routes = {
  path: '',

  // Keep in mind, routes are evaluated in order
  children: [
    {
      path: '',
      load: () => import(/* webpackChunkName: 'readerChunk' */ '@/routes/reader'),
    },
  ],

  async action(context) {
    // Execute each child route until one of them return the result
    let route = await context.next();
    console.info(route.params)
    // Provide default values for title, description etc.
    route.title = `${route.title || 'Untitled Page'} - www.reactstarterkit.com`
    route.description = route.description || ''
    console.info(route)

    return route
  },
}

export default routes
