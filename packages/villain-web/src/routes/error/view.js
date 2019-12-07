import React from 'react'
import Layout from '@/components/layout'
import Footer from '@/components/footer'

function View() {
  return (
    <Layout>
      <div className={'landing'}>
        <div className={'landing__content'}>
          <div className="landing__message">
            <h1>404</h1>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default React.memo(View)
