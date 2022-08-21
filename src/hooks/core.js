import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useContext,
} from "react";

import { LAYOUT_MODE, ACTION_TYPE } from "@/constants";

import { store } from "@/store";

const useIsMounted = () => {
  const mounted = useRef(null);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  return mounted;
};

function useCore() {
  const { state, dispatch } = useContext(store);
  const { pages, options, currentPage, currentPages } = state;
  const { layout, playbackInterval, play, loop, mangaMode } = options;
  const mounted = useIsMounted();

  useEffect(() => {
    if (mounted.current) {
      const payload = `villain-${Math.random().toString(16).slice(2)}`;
      dispatch({ type: ACTION_TYPE.SET_ID, payload });
    }
  }, [mounted.current]);

  const navigate = (payload) => {
    dispatch({ type: ACTION_TYPE.SET_PAGE, payload });
  };

  const handleAutomaticNavigation = useCallback(() => {
    if (mounted.current && play) {
      navigate({ steeps: 1 });
    }
  }, [play, mounted.current]);

  const setCurrentPages = (currentPages) => {
    dispatch({ type: ACTION_TYPE.SET_CURRENT_PAGES, payload: currentPages });
  };

  useEffect(() => {
    if (
      !pages ||
      !pages.length ||
      currentPage < 0 ||
      currentPage >= pages.length
    ) {
      // The page is not extracted yet
      return;
    }

    let newPages = [];

    if (pages[currentPage]) {
      newPages[0] = pages[currentPage];
    }

    // Show second page if layout mode is set to book
    if (layout === LAYOUT_MODE.BOOK) {
      const nextPage = currentPage + 1;
      // Check if next paage exists
      if (newPages.length && nextPage < pages.length && pages[nextPage]) {
        newPages[1] = pages[nextPage];
        if (mangaMode) {
          newPages = newPages.slice().reverse();
        }
      }
    }

    const shouldUpdate = () => {
      if (newPages.length !== currentPages.length) {
        return true;
      }

      if (!newPages || !newPages.length) {
        return null;
      }

      if (currentPages.length && currentPages[0].url !== newPages[0].url) {
        return true;
      }

      return false;
    };

    const updated = shouldUpdate();
    const restored = updated === null;

    if (updated) {
      setCurrentPages(newPages);
    } else if (restored) {
      // Restore state
      setCurrentPages([]);
    }
  }, [
    currentPage,
    currentPages,
    currentPages,
    setCurrentPages,
    pages,
    layout,
    mangaMode,
  ]);

  useEffect(() => {
    if (
      mounted.current &&
      play &&
      playbackInterval &&
      currentPage > -1 &&
      currentPages &&
      currentPages.length
    ) {
      const timer = setTimeout(
        handleAutomaticNavigation,
        playbackInterval * 1000
      );
      return () => clearTimeout(timer);
    }
  }, [play, currentPage, mounted.current, playbackInterval, currentPages]);

  return [state.id];
}

export default useCore;
