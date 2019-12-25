import React from 'react'
import Layout from '@/components/layout'
import UrlInput from '@/components/urlInput'

const API = 'https://villain.js.org/#/reader?src='

function CodeSnippet({ content }) {
  const template = `<iframe
  src="${API}${content}"
  style="border: 0"
  allowFullscreen
/>`
  return <pre className="code-block">{template}</pre>
}

function View() {
  const [url, setUrl] = React.useState('')
  const handleUrlChange = React.useCallback(newUrl => {
    setUrl(newUrl)
  })

  return (
    <Layout>
      <section>
        <div className={'landing__content'}>
          <div className="landing__message">
            <h2>Embed API</h2>
            <p>
              {' '}
              <b>Enter</b> a valid url of the comic book:{' '}
            </p>
          </div>
          <UrlInput onChange={handleUrlChange} submit={false} />
          <CodeSnippet content={url} />
        </div>
      </section>
    </Layout>
  )
}

export default React.memo(View)
