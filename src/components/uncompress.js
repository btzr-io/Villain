import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Archive } from 'libarchive.js/main'
import { asyncForEach, fetchArchive, isValidImageType } from '@/lib/utils'
import { ReaderContext } from '@/context'

// Components
import RenderError from '@/components/renderError'
import Loader from '@/components/loader'

// Icons
import { mdiFileAlert } from '@mdi/js'

const Uncompress = React.memo(
  ({ source = null, workerUrl = null, children, ...context }) => {
    
    const archive = useRef(null)

    // Context sate
    const { ready, error, maxPages, pages, load } = context

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
      // Free up memory
      if (archive.current) {
        archive.current_.worker.terminate()
        archive.current = null
      }
    }

    const handleError = err => {
      console.error(err)
      context.trigger('error', err.message || err)
    }

    const extract = async blob => {
      try {
        // Get compressed files
        const images = await openArchive(blob)

        if (images && images.length > 0) {
          const items =
            maxPages && maxPages < images.length ? images.splice(0, maxPages) : images

          await asyncForEach(items, async (item, index) => {
            const file = await item.file.extract()
            handleExtractedFile(file, index)
            // After last itme free up memory
            if (index === items.length - 1) {
              archive.current._worker.terminate()
            }
          })
        } else {
          context.trigger('error', 'Cant open archive')
          archive.current._worker.terminate()
        }
      } catch (err) {
        // Handle Errors
        console.error(err)
        handleError(err)
        archive.current._worker.terminate()
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
      archive.current = await Archive.open(file)
      const compressedFiles = await archive.current.getFilesArray()
      const images = compressedFiles.filter(item => isValidImageType(item.file.name))

      if (images.length > 1 && false) {
        // Fix sort order
        images.sort((a, b) => {
          if (a.file.name > b.file.name) return 1
          if (a.file.name < b.file.name) return -1
          return 0
        })
      }
      // Check limits
      const totalPages = maxPages && maxPages < images.length ? maxPages : images.length
      context.updateCotextState({ totalPages })
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
      // Remove previous archive data
      context.clear()

      // Empty source
      if (!source) { return }

      // Loading archive from url
      if (typeof source === 'string') {
        // Load archive from valid source
        loadArchiveFromUrl(source)
      }

      // Loading archive from blob or file
      if (source instanceof Blob) {
        loadArchiveFromBlob(source)
      }
    }, [source])

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
        maxPages,
        // Actions
        clear,
        trigger,
        createPage,
        updateState,
      }) => {
        return (
          <Uncompress
            {...props}
            load={load}
            error={error}
            ready={ready}
            pages={pages}
            maxPages={maxPages}
            clear={clear}
            trigger={trigger}
            updateCotextState={updateState}
            createPage={createPage}
          />
        )
      }}
    </ReaderContext.Consumer>
  )
})

Uncompress.propTypes = {
  source: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Blob)]),
  workerUrl: PropTypes.string,
}

export default UncompressConsumer
