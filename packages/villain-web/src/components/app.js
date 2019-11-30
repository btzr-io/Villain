import React from 'react'

function App({ context, children }) {
  // NOTE: If you need to add or modify header, footer etc. of the app,
  // please do that inside the Layout component.
  return <React.Fragment>{React.cloneElement(children, context)}</React.Fragment>
}

export default React.memo(App)
