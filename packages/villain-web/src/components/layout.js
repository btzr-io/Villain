import React from 'react'
import Nav from '@/components/nav'
import Footer from '@/components/footer'

function Layout({ children }) {
  return (
    <React.Fragment>
      <Nav />
      {children}
      <Footer />
    </React.Fragment>
  )
}

export default React.memo(Layout)
