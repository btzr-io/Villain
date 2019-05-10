import React, { Component } from 'react'
export const ReaderContext = React.createContext()

const defaultState = {
  pages: [],
  ready: false,
  error: null,
  totalPages: 0,
  isLastPage: false,
  isFirstPage: true,
  currentPage: null,

  // Settings
  theme: 'dark',
  bookMode: true,
  fullscreen: false,
}

export class ReaderProvider extends Component {
  state = { ...defaultState }

  updateState = data => {
    this.setState(data)
  }

  toggleSetting = setting => {
    this.setState(prevState => ({ [setting]: !prevState[setting] }))
  }

  createPage = page => {
    const pages = this.state.pages.concat(page)
    this.setState({ pages })
  }

  trigger = (eventName, data) => {
    // Ready to display first page (cover)
    if (eventName === 'ready') {
      this.setState({ ready: true, error: null, currentPage: 0, ...data })
    }

    if (eventName === 'error' && data) {
      console.error(data)
      this.setState({ ready: false, error: data })
    }
  }

  navigateForward = () => {
    this.setState(prevState => {
      if (prevState.isLastPage) return {}

      const { totalPages, currentPage } = prevState
      const nextPage = currentPage + 1
      const isLastPage = nextPage === totalPages - 1
      const isFirstPage = nextPage === 0

      return { isLastPage, isFirstPage, currentPage: nextPage }
    })
  }

  navigateBackward = () => {
    this.setState(prevState => {
      if (prevState.isFirstPage) return {}
      const { totalPages, currentPage } = prevState
      const prevPage = currentPage - 1
      const isLastPage = prevPage === totalPages - 1
      const isFirstPage = prevPage === 0

      return { isLastPage, isFirstPage, currentPage: prevPage }
    })
  }

  getPage = index => {
    const { pages, bookMode, totalPages } = this.state
    const page = pages[index]
    const nextIndex = index + 1
    const nextPageExists = nextIndex >= 0 || nextIndex < totalPages
    const shouldRenderBookMode =
      nextPageExists && !(index === 0 || index === totalPages - 1)

    // Return two pages
    if (this.state.bookMode && shouldRenderBookMode) {
      const nextPage = pages[nextIndex]
      return [page, nextPage]
    }

    // Return single page
    return page
  }

  render() {
    return (
      <ReaderContext.Provider
        value={{
          state: this.state,
          trigger: this.trigger,
          getPage: this.getPage,
          createPage: this.createPage,
          updateState: this.updateState,
          toggleSetting: this.toggleSetting,
          navigateForward: this.navigateForward,
          navigateBackward: this.navigateBackward,
        }}
      >
        {this.props.children}
      </ReaderContext.Provider>
    )
  }
}

//  Access context
// <ReaderContext.Consumer> { context => (<div />)}<ReaderContext.Consumer/>
