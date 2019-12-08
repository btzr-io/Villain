import React from 'react'
import Icon from '@mdi/react'
import Layout from '@/components/layout'
import Reader from '@/components/reader'
import UrlInput from '@/components/urlInput'

import { useDropzone } from 'react-dropzone'
import { mdiArrowDownBoldBoxOutline } from '@mdi/js'

function FileButton({ onChange }) {
  const handleChange = React.useCallback(
    e => {
      const { files } = e.target
      onChange(files)
    },
    [onChange]
  )

  return (
    <label className={'button button--primary'}>
      <input
        type="file"
        name="input-name"
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      <span id="input-file-replacer">Choose file</span>
    </label>
  )
}

function DropZone() {
  return (
    <div className={'landing__content'}>
      <Icon
        className="footer__icon"
        aria-label="love"
        path={mdiArrowDownBoldBoxOutline}
        size={4}
        color="currentColor"
      />{' '}
      <div className={'landing__message'}>Drop it here!</div>
    </div>
  )
}

function View({ query }) {
  const [file, setFile] = React.useState(null)

  const [source, setSource] = React.useState(query.src)

  const handleFileChange = React.useCallback(files => {
    setFile(files[0])
  })

  const handleUrlChange = React.useCallback(url => {
    setFile(url)
  })

  // Update source
  React.useEffect(() => {
    setSource(query.src || file)
  }, [file, query])

  const onDrop = React.useCallback(
    acceptedFiles => {
      handleFileChange(acceptedFiles)
    },
    [handleFileChange]
  )

  const { getRootProps, isDragActive } = useDropzone({ onDrop })

  return !source ? (
    <Layout>
      <div {...getRootProps({ className: 'landing' })}>
        {!isDragActive ? (
          <div className={'landing__content'}>
            <div className="landing__message">
              <b>Select</b> comic book or <b>drop</b> it here
            </div>
            <div className="landing__message">
              <FileButton onChange={handleFileChange} />
              <button className={'button button--secondary'}>Try example</button>
            </div>
            <div className="landing__message">
              <b>Enter</b> a valid url of the comic book
            </div>
            <UrlInput onSubmit={handleUrlChange} submit={true} />
          </div>
        ) : (
          <DropZone />
        )}
      </div>
    </Layout>
  ) : (
    <Reader source={source} />
  )
}

export default React.memo(View)
