import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Archive } from 'libarchive.js/main'
import { asyncForEach, fetchArchive, isValidImageType } from '@/lib/utils'
import { ReaderContext } from '@/context'

// Components
import Error from './error'
import Loader from './loader'

class Uncompress extends Component {
  static contextType = ReaderContext

  static defaultProps = {
    file: null,
    workerPath: null,
  }

  constructor(props) {
    super(props)
    this.archive = null
  }

  loadArchiveFromUrl(url) {
    fetchArchive(url, this.extract, this.handleError)
  }

  loadArchiveFromBlob(blob) {
    this.extract(blob)
  }

  handleExtractedFile = (file, index) => {
    const { size, name } = file
    const defultPageOpts = { type: 'image' }
    const url = URL.createObjectURL(file)
    const page = { index, url, name, size, ...defultPageOpts }
    this.context.createPage(page)
  }

  handleError = err => {
    this.context.trigger('error', err.message || err)
  }

  handleDestroy = () => {
    const { pages } = this.context.state
    // Release memory
    if (pages && pages.length > 0) {
      pages.forEach(page => {
        URL.revokeObjectURL(page.src)
      })
    }
  }

  openArchive = async file => {
    const { workerPath: workerUrl } = this.props

    // Setup worker
    Archive.init({ workerUrl })

    // Open archive
    const archive = await Archive.open(file)
    const comporessedFiles = await archive.getFilesArray()
    const images = comporessedFiles.filter(item => isValidImageType(item.file.name))

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
    const archiveData = { type, size, totalPages: images.length }
    this.context.trigger('loaded', archiveData)

    return images.length > 0 ? images : null
  }

  extract = async blob => {
    try {
      // Compressed files 1437
      const list = await this.openArchive(blob)

      if (list && list.length > 0) {
        await asyncForEach(list, async (item, index) => {
          const file = await item.file.extract()
          this.handleExtractedFile(file, index)
        })
      } else {
        this.context.trigger('error', "Can't open archive!")
      }
    } catch (err) {
      // Handle Errors
      this.handleError(err)
    }
  }

  componentDidMount() {
    const { file } = this.props
    // Load archive from valid source
    if (typeof file === 'string') {
      this.loadArchiveFromUrl(file)
    } else {
      this.loadArchiveFromBlob(file)
    }
  }

  componentWillUnmount() {
    // Free memory
    this.handleDestroy()
  }

  render() {
    const { ready, error } = this.context.state
    return (
      <React.Fragment>
        {(error && <Error message={error.message || error} />) ||
          (!ready ? <Loader /> : this.props.children)}
      </React.Fragment>
    )
  }
}

Uncompress.propTypes = {
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Blob)]),
  workerPath: PropTypes.string,
}

export default Uncompress
