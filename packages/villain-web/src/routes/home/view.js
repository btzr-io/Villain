import React from 'react'
import Footer from '@/components/footer'
import Layout from '@/components/layout'
import Button from '@/components/button'

function View() {
  return (
    <Layout>
      <div className={'landing'}>
        <div className={'landing__content'}>
          <img
            className="logo"
            src="https://raw.githubusercontent.com/btzr-io/Villain/master/artworks/logo-small.png"
          />
          <div className="landing__message">
            An open source web-based comic book reader.
          </div>
          <div className="landing__message">
            <Button navigate="/reader" buttonType="primary">
              Try it now!
            </Button>
            <Button navigate="/embed" buttonType="secondary">
              Embed API
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default React.memo(View)
