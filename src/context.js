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
}

export class ReaderProvider extends Component {
  state = { ...defaultState }

  updateState = data => {
    this.setState(data)
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
      console.info(nextPage)
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
      console.info(prevPage)
      return { isLastPage, isFirstPage, currentPage: prevPage }
    })
  }

  getPage = index => {
    return this.state.pages[index] || null
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
