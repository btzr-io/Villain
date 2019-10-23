import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Archive } from 'libarchive.js/main'
import { asyncForEach, fetchArchive, isValidImageType } from '@/lib/utils'
import { ReaderContext } from '@/context'
import Localize from '@/localize'

// Components
import Error from './error'
import Loader from './loader'

class Uncompress extends Component {
  static contextType = ReaderContext

  static defaultProps = {
    file: null,
    workerUrl: null,
    preview: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      size: null,
      name: null,
      type: null,
    }
  }

  loadArchiveFromUrl(url) {
    fetchArchive(url, this.extract, this.handleError)
  }

  loadArchiveFromBlob(blob) {
    this.extract(blob)
  }

  handleExtractedFile = (file, index) => {
    const { size, name } = file
    const defaultPageOpts = { type: 'image' }
    const url = URL.createObjectURL(file)
    const page = { index, url, name, size, ...defaultPageOpts }
    this.context.createPage(page)
  }

  handleError = err => {
    console.error(err)
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
    const { workerUrl, preview } = this.props

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
    this.context.trigger('loaded', archiveData)

    // If returns null it means that the archive is empty
    // or don't contains any valid images.
    // Note: Improve error message.
    return images.length > 0 ? images : null
  }

  extract = async blob => {
    const { preview } = this.props
    try {
      // Compressed files 1437
      const list = await this.openArchive(blob)

      if (list && list.length > 0) {
        const items = preview ? list.splice(0, preview) : list
        await asyncForEach(items, async (item, index) => {
          const file = await item.file.extract()
          this.handleExtractedFile(file, index)
        })
      } else {
        this.context.trigger('error', Localize['Cant open archive'])
      }
    } catch (err) {
      // Handle Errors
      console.error(err)
      this.handleError(err)
    }
  }

  componentDidMount() {
    const { file, workerUrl } = this.props
    // Init libarchivejs: Setup worker
    Archive.init({ workerUrl })
    // Load archive from valid source
    if (typeof file === 'string') {
      this.loadArchiveFromUrl(file)
    } else {
      this.loadArchiveFromBlob(file)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { file } = this.props

    // Loading archive from url
    if (typeof file === 'string' && prevProps.file !== file) {
      // Remove previous archive data
      this.context.clear()
      // Load archive from valid source
      this.loadArchiveFromUrl(file)
    }

    // Loading archive from blob or file
     if(file  instanceof Blob) {
       if (
         prevState.name!== this.state.name ||
         prevState.size !== this.state.size ||
         prevState.type !== this.state.type 
       ) {
         this.context.clear()
         this.loadArchiveFromBlob(file)
       }
     }
  }

  componentWillUnmount() {
    // Free memory
    this.handleDestroy()
  }

  static getDerivedStateFromProps(props, { fileName }) {
    if (props.file) {
      const { name, size, type } = props.file
      return { name, size, type }
   }
    return { name: null, size: null }
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
  workerUrl: PropTypes.string,
  preview: PropTypes.number,
}

export default Uncompress
