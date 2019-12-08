import React from 'react'

function App({ context, children }) {
  return <React.Fragment>{React.cloneElement(children, context)}</React.Fragment>
}

export default React.memo(App)
