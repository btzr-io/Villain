import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Archive } from 'libarchive.js/main'
import { getMimeType, fetchArchive, isValidImageType } from '../utils'
import { ReaderContext } from '../context'

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
    this.state = {
      ready: false,
      loading: true,
    }
  }

  loadArchiveFromUrl(url) {
    fetchArchive(url, this.extract)
  }

  loadArchiveFromBlob(blob) {
    this.extract(blob)
  }

  handleError(err) {
    this.context.trigger('error', err)
  }

  openArchive = async file => {
    const { workerPath: workerUrl } = this.props

    // Setup worker
    Archive.init({ workerUrl })

    // Open archive
    const archive = await Archive.open(file)
    const comporessedFiles = await archive.getFilesArray()

    // Filter images
    const images = comporessedFiles.filter(item => isValidImageType(item.file.name))

    // Fix sort order
    images.sort((a, b) => {
      if (a.file.name > b.file.name) return 1
      if (a.file.name < b.file.name) return -1
      return 0
    })

    return images
  }

  extract = async blob => {
    try {
      // Compressed files
      const list = await this.openArchive(blob)

      const pages = await list.map(async (item, index) => {
        const file = await item.file.extract()
        const { size, name } = file

        const type = getMimeType(name)
        const blob = new Blob([file], { type })
        const url = URL.createObjectURL(blob)

        const page = { index, url, name, size, type: 'image', buildPyramid: false }
        this.context.createPage(page)

        // Display cover
        if (index === 0) {
          this.context.trigger('ready')
        }
      })
    } catch (err) {
      // Handle Errors
      this.handleError(err)
    } finally {
      if (this.context.state.ready) {
        console.info('done!')
      } else {
        this.handleError('unable to read archive!')
      }
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

  render() {
    const { ready, error } = this.context.state
    const isLoading = !ready && !error

    return (
      <React.Fragment>
        {error && <Error />}
        {isLoading ? <Loader /> : this.props.children}
      </React.Fragment>
    )
  }
}

Uncompress.propTypes = {
  workerPath: PropTypes.string,
}

export default Uncompress
