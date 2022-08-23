import React, { useContext, useCallback, useLayoutEffect } from "react";

import { store } from "@/store";

export default function useFullscreenStatus() {
  const { state } = useContext(store);
  const { id } = state;

  const [isFullscreen, setIsFullscreen] = React.useState(
    document[getBrowserFullscreenElementProp()] != null
  );

  const getTarget = (id) => {
    return document.getElementById(id);
  };

  const getIsFullscreen = () =>
    document[getBrowserFullscreenElementProp()] != null;

  const toggleFullscreen = () => {
    const target = getTarget(id);
    if (!target) return;

    if (getIsFullscreen()) {
      document.exitFullscreen();

      return;
    }

    target
      .requestFullscreen()
      .then(() => {
        setIsFullscreen(getIsFullscreen());
      })
      .catch((e) => {
        setIsFullscreen(false);
      });
  };

  useLayoutEffect(() => {
    const target = getTarget(id);
    if (!target) return;
    target.onfullscreenchange = () => setIsFullscreen(getIsFullscreen());
    return () => (target.onfullscreenchange = undefined);
  }, [id, getIsFullscreen]);

  return [isFullscreen, toggleFullscreen];
}

function getBrowserFullscreenElementProp() {
  if (typeof document.fullscreenElement !== "undefined") {
    return "fullscreenElement";
  } else if (typeof document.mozFullScreenElement !== "undefined") {
    return "mozFullScreenElement";
  } else if (typeof document.msFullscreenElement !== "undefined") {
    return "msFullscreenElement";
  } else if (typeof document.webkitFullscreenElement !== "undefined") {
    return "webkitFullscreenElement";
  } else {
    throw new Error("fullscreenElement is not supported by this browser");
  }
}
