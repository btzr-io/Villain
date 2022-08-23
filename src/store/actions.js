import { initialState } from "@/store/default";
import { ACTION_TYPE, READY_STATE } from "@/constants";
import { clamp } from "@/utils";

const ACTIONS = {
  [ACTION_TYPE.SET_ID]: (state, id) => {
    return { ...state, id };
  },
  [ACTION_TYPE.ADD_PAGE]: (state, page) => {
    const index = state.pages.length + 1;
    const nextState = {
      ...state,
      pages: [...state.pages, page],
      progress: clamp(index / state.totalPages, 0, 1).toFixed(2),
    };
    // First page extracted
    if (index === 1) {
      nextState.readyState = READY_STATE.UNPACKING_ARCHIVE;
      // Navigate to first page if there none selected
      if (nextState.currentPage === -1) {
        nextState.currentPage = 0;
      }
    }

    // Last page extracted
    if (state.totalPages && state.totalPages === index) {
      nextState.readyState = READY_STATE.READY;
    }

    return nextState;
  },
  [ACTION_TYPE.SET_CURRENT_PAGES]: (state, currentPages) => {
    return { ...state, currentPages };
  },
  [ACTION_TYPE.SET_PAGE]: (state, { index, steeps = 0 }) => {
    let newState = null;
    let stopPlayback = false;
    let newIndex = index === 0 ? 0 : index || state.currentPage;
    const lastIndex = state.totalPages > 0 ? state.totalPages - 1 : 0;
    const { loop, play, mangaMode } = state.options;
    if (mangaMode && !steeps) {
      newIndex = lastIndex - index;
    }
    // Steps
    if (steeps || steeps === 0) {
      newIndex += steeps * (mangaMode ? -1 : 1);
    }
    // loop navigations
    if (loop) {
      if (newIndex < 0) {
        newIndex = lastIndex;
      }
      if (newIndex > lastIndex) {
        newIndex = 0;
      }
    } else {
      if (mangaMode ? newIndex < 1 : newIndex >= lastIndex) {
        stopPlayback = true;
      }
    }
    // Validate new index
    if (newIndex >= 0 && newIndex <= lastIndex) {
      if (stopPlayback) {
        return {
          ...state,
          currentPage: newIndex,
          options: { ...state.options, play: false },
        };
      }
      return { ...state, currentPage: newIndex };
    }
    return state;
  },
  [ACTION_TYPE.SET_LAYOUT]: (state, layout) => {
    return { ...state, options: { ...state.options, layout: layout } };
  },
  [ACTION_TYPE.CLEAR_STATE]: () => initialState,
  [ACTION_TYPE.UPDATE_STATE]: (state, update) => {
    return {
      ...state,
      ...(update(state) || {}),
    };
  },
  [ACTION_TYPE.UPDATE_READY_STATE]: (state, readyState) => ({
    ...state,
    readyState,
  }),
  [ACTION_TYPE.UPDATE_OPTIONS]: (state, options) => ({
    ...state,
    options: { ...state.options, ...options },
  }),
  [ACTION_TYPE.THROW_ERROR]: (state, error) => ({
    ...state,
    error,
    readyState: READY_STATE.ERROR,
  }),
  [ACTION_TYPE.SET_PASSWORD]: (state, password) => ({
    ...state,
    password: password,
    readyState: READY_STATE.DECRYPTING_ARCHIVE,
  }),
  [ACTION_TYPE.REQUEST_PASSWORD]: (state) => ({
    ...state,
    encrypted: true,
    readyState: READY_STATE.REQUESTING_PASSWORD,
  }),
};

export default ACTIONS;
