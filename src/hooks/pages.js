import React, { useContext } from 'react'
import { LAYOUT_MODE } from '@/constants'
import { store } from '@/store'

function usePages() {
  const { state, dispatch } = useContext(store)
  const { pages, options, currentPages } = state
  return { pages, currentPages }
}

export default usePages
