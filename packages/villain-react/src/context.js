import React, { Component } from 'react'

// State
const defaultState = {
  pages: [],
  ready: false,
  error: null,
  totalPages: 0,
  canZoomIn: false,
  canZoomOut: false,
  fullscreen: false,
  isLastPage: false,
  isFirstPage: false,
  currentPage: null,
  currentZoom: null,
  renderError: false,
}

// Settings
const defaultSettings = {
  theme: 'Light',
  language: 'en',
  maxPages: 500,
  bookMode: false,
  mangaMode: false,
  forceSort: true,
  allowFullScreen: true,
  autoHideControls: false,
  allowGlobalShortcuts: false,
}

// Default values
const defaultContext = { ...defaultState, ...defaultSettings }

// Create main context
export const ReaderContext = React.createContext()

// Create provider for context
export class ReaderProvider extends Component {
  constructor(props) {
    super(props)

    this.updateState = (data, callback) => {
      this.setState(data, callback)
    }

    this.clear = () => {
      this.setState({ ...defaultState })
    }

    this.toggleSetting = setting => {
      this.setState(prevState => ({ [setting]: !prevState[setting] }))
    }

    this.createPage = page => {
      const pages = this.state.pages.concat(page)
      if (page.index === 0) {
        this.setState({
          ready: true,
          error: null,
          currentPage: 0,
          pages,
        })
      } else {
        this.setState({ pages })
      }
    }

    this.trigger = (eventName, data) => {
      if (eventName === 'error' && data) {
        console.error(data)
        this.setState({ ready: false, error: data })
      }
    }

    this.togglePin = () => {
      this.setState(prevState => ({
        autoHideControls: !prevState.autoHideControls,
      }))
    }

    this.navigateToPage = pageIndex => {
      this.setState(prevState => {
        const { totalPages } = prevState
        const lastIndex = totalPages - 1
        // Validate page index
        if (pageIndex < 0 || pageIndex > lastIndex) return {}
        // Update state
        const isLastPage = pageIndex === lastIndex
        const isFirstPage = pageIndex === 0
        return { isLastPage, isFirstPage, currentPage: pageIndex }
      })
    }

    this.navigateForward = () => {
      const { isLastPage, currentPage } = this.state
      if (!isLastPage) {
        this.navigateToPage(currentPage + 1)
      }
    }

    this.navigateBackward = () => {
      const { isFirstPage, currentPage } = this.state
      if (!isFirstPage) {
        this.navigateToPage(currentPage - 1)
      }
    }

    this.getPage = index => {
      const { pages, bookMode } = this.state
      const page = pages && pages.length && pages[index]
      // Page source exists
      if (page) {
        const nextIndex = index + 1
        const nextPageExists = nextIndex < pages.length
        const shouldRenderBookMode = bookMode && nextPageExists && index > 0
        // Return two pages:
        // Cover (first page) will always render as a single page
        if (shouldRenderBookMode) {
          const nextPage = pages[nextIndex]
          return [page, nextPage]
        }
        // Return single page
        return page
      }
      // No pages found
      return null
    }

    this.state = {
      // Actions
      clear: this.clear,
      trigger: this.trigger,
      getPage: this.getPage,
      updateState: this.updateState,
      createPage: this.createPage,
      toggleSetting: this.toggleSetting,
      togglePin: this.togglePin,
      navigateToPage: this.navigateToPage,
      navigateForward: this.navigateForward,
      navigateBackward: this.navigateBackward,
      // Options
      ...defaultContext,
      ...this.props.externalOptions,
    }
  }

  render() {
    return (
      <ReaderContext.Provider value={this.state}>
        {this.props.children}
      </ReaderContext.Provider>
    )
  }
}
