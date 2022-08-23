import React, { useEffect, useContext } from 'react'
import { store } from '@/store'
import { clamp } from '@/utils'
import { ACTION_TYPE } from '@/constants'

function useNavigation(opts) {
  const { state, dispatch } = useContext(store)
  const { currentPage, totalPages, readyState, options } = state
  const { mangaMode, loop } = options

  const navigate = (payload) => {
    dispatch({ type: ACTION_TYPE.SET_PAGE, payload })
  }

  const nextIndex = currentPage + 1
  const currentPageNumber = mangaMode ? totalPages - nextIndex + 1 : nextIndex
  const navState = {
    canBack: (currentPageNumber > 1 && totalPages > 1) || loop,
    canForward: (currentPageNumber < totalPages && totalPages > 1) || loop,
    currentPageNumber,
  }

  const actions = {
    go: (index) => {
      navigate({ index: index })
    },
    back: () => {
      navigate({ steeps: -1 })
    },
    first: () => {
      navigate({ index: 0 })
    },
    last: () => {
      navigate({ index: totalPages - 1 })
    },
    forward: () => {
      navigate({ steeps: 1 })
    },
  }

  return { currentPage, totalPages, ...actions, ...navState }
}

export default useNavigation
