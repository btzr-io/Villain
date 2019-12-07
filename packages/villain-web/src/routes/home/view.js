import React from 'react'
import Footer from '@/components/footer'
import Layout from '@/components/layout'
function View() {
  return (
    <Layout>
      <div className={'landing'}>
        <div className={'landing__content'}>
          <div className="landing__message">
            <b>Select</b> comic book or <b>drop</b> it here.
          </div>
          <div className="landing__message">
            <button className={'button'}>Try now</button>
            <button className={'button button--secondary'}>Learn more</button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default React.memo(View)
