import React from 'react'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import GithubCorner from '@/components/githubCorner'

function Layout({ children }) {
  return (
    <React.Fragment>
      <Nav />
      <GithubCorner />
      {children}
      <Footer />
    </React.Fragment>
  )
}

export default React.memo(Layout)
