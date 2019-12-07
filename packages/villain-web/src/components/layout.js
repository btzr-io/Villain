import React from 'react'
import Footer from '@/components/footer'
import GithubCorner from '@/components/githubCorner'

function App({ context, children }) {
  return (
    <React.Fragment>
      <GithubCorner />
      {children}
      <Footer />
    </React.Fragment>
  )
}

export default React.memo(App)
