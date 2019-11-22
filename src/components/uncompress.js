import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Archive } from 'libarchive.js/main'
import { asyncForEach, fetchArchive, isValidImageType } from '@/lib/utils'
import { ReaderContext } from '@/context'

// Components
import RenderError from '@/components/renderError'
import Loader from '@/components/loader'

// Icons
import { mdiFileAlert } from '@mdi/js'
import { setState } from 'expect/build/jestMatchersObject'

const Uncompress = React.memo(
  ({ file = null, workerUrl = null, children, ...context }) => {
    const state = useState({
      size: null,
      name: null,
      type: null,
    })

    // Context sate
    const { ready, error, preview, pages, load } = context

    const loadArchiveFromUrl = url => {
      fetchArchive(url, extract, handleError)
    }

    const loadArchiveFromBlob = blob => {
      extract(blob)
    }

    const handleDestroy = () => {
      // Release memory
      if (pages && pages.length > 0) {
        pages.forEach(page => {
          URL.revokeObjectURL(page.src)
        })
      }
    }

    const handleError = err => {
      console.error(err)
      context.trigger('error', err.message || err)
    }

    const extract = async blob => {
      try {
        // Compressed files 1437
        const list = await openArchive(blob)

        if (list && list.length > 0) {
          const items = preview ? list.splice(0, preview) : list

          await asyncForEach(items, async (item, index) => {
            const file = await item.file.extract()
            handleExtractedFile(file, index)
          })
        } else {
          context.trigger('error', 'Cant open archive')
        }
      } catch (err) {
        // Handle Errors
        console.error(err)
        handleError(err)
      }
    }

    const handleExtractedFile = (file, index) => {
      const { size, name } = file
      const defaultPageOpts = { type: 'image' }
      const url = URL.createObjectURL(file)
      const page = { index, url, name, size, ...defaultPageOpts }

      context.createPage(page)
    }

    const openArchive = async file => {
      // Open archive
      const archive = await Archive.open(file)
      const compressedFiles = await archive.getFilesArray()
      const images = compressedFiles.filter(item => isValidImageType(item.file.name))

      if (images.length > 1 && false) {
        // Fix sort order
        images.sort((a, b) => {
          if (a.file.name > b.file.name) return 1
          if (a.file.name < b.file.name) return -1
          return 0
        })
      }
      // Load archive data
      const { type, size } = file
      const totalPages = preview && preview < images.length ? preview : images.length
      const archiveData = { type, size, totalPages }
      context.trigger('loaded', archiveData)

      // If returns null it means that the archive is empty
      // or don't contains any valid images.
      // Note: Improve error message.
      return images.length > 0 ? images : null
    }

    useEffect(() => {
      // Init libarchivejs: Setup worker
      Archive.init({ workerUrl })

      return () => {
        handleDestroy()
      }
    }, [])

    useEffect(() => {
      if (!file) {
        setState({ name: null, size: null, type: null })
        return
      }

      const { name, size, type } = file
      setState({ name, size, type })

      // Loading archive from url
      if (typeof file === 'string') {
        // Remove previous archive data
        context.clear()
        // Load archive from valid source
        loadArchiveFromUrl(file)
      }

      // Loading archive from blob or file
      if (file instanceof Blob) {
        context.clear()
        loadArchiveFromBlob(file)
      }
    }, [file])

    return (
      <React.Fragment>
        {(error && (
          <RenderError message={error.message || error} icon={mdiFileAlert} />
        )) ||
          (!ready ? <Loader /> : children)}
      </React.Fragment>
    )
  }
)

const UncompressConsumer = React.memo(props => {
  return (
    <ReaderContext.Consumer>
      {({
        // State
        load,
        error,
        ready,
        pages,
        preview,
        // Actions
        clear,
        trigger,
        createPage,
      }) => {
        return (
          <Uncompress
            {...props}
            load={load}
            error={error}
            ready={ready}
            pages={pages}
            preview={preview}
            clear={clear}
            trigger={trigger}
            createPage={createPage}
          />
        )
      }}
    </ReaderContext.Consumer>
  )
})

Uncompress.propTypes = {
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Blob)]),
  preview: PropTypes.number,
  workerUrl: PropTypes.string,
}

export default UncompressConsumer
