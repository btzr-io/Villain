import React from 'react'
import Footer from '@/components/footer'
import Layout from '@/components/layout'
import Button from '@/components/button'
import Icon from '@mdi/react'
import { mdiEyeOutline, mdiXml, mdiHeart, mdiGithubCircle } from '@mdi/js'


function Card({title, description, icon}){
  return( <div className={"card"}>
   <Icon
     className="card__icon"
     aria-label={icon}
     path={icon}
     size={2.24}
     color="currentColor"
   />
   <h3 className='card__title'>{title}</h3>
   <p className='card__description'>{description}</p>
   </div>)
}

function View() {
  return (
    <Layout>
      <section className={'landing'}>
        <div className={'landing__content'}>
          <img
            className="logo"
            src="https://raw.githubusercontent.com/btzr-io/Villain/master/artworks/logo-small.png"
          />
          <div className="landing__message">
            A free and open source web-based comic book reader.
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
      </section>
      <section>
          <h1>
            Made with{' '}
            <Icon
              className="footer__icon"
              aria-label="love"
              path={mdiHeart}
              size={1.25}
              color="#ff6b6b"
            />{' '}
            for the web!
            </h1>
          <div className="landing__message">
           <Card icon={mdiGithubCircle} title={'Open source'} description={'MIT license, feel free to check the source code.'} />
              <Card icon={mdiXml} title={'Embed API'} description={'Easy to integrate on any modern website.'} />
           <Card icon={mdiEyeOutline} title={'Privacy'} description={'Free from ads, trackers and data collection.'} />

          </div>
      </section>
    </Layout>
  )
}

export default React.memo(View)
