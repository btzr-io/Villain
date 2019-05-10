import React, { Component } from 'react'
export const ReaderContext = React.createContext()

const defaultState = {
  pages: [],
  ready: false,
  error: null,
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
      this.setState({ ...defaultState, ready: true, currentPage: 0 })
    }

    if (eventName === 'error' && data) {
      console.error(data)
      this.setState({ ...defaultState, error: data })
    }
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
        }}
      >
        {this.props.children}
      </ReaderContext.Provider>
    )
  }
}

//  Access context
// <ReaderContext.Consumer> { context => (<div />)}<ReaderContext.Consumer/>
