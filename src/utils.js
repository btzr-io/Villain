import { FILE_TYPES, IMAGE_TYPES } from "@/constants";

// Handle response status
const status = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
};

// const headers = new Headers({'Access-Control-Allow-Origin': '*'})

export const fetchArchive = (url, callback, errorCallback) => {
  fetch(url, { mode: "cors" /*headers*/ })
    .then(status)
    .then((res) => {
      // Get content-type
      // const contentType = res.headers.get('Content-Type')
      return res.blob();
    })
    .then(callback)
    .catch((error) => {
      errorCallback && errorCallback("Cant open archive");
      console.error("Request failed", error);
    });
};

export const sortByName = (a, b) => {
  if (a.file.name > b.file.name) return 1;
  if (a.file.name < b.file.name) return -1;
  return 0;
};

export const getFileExtension = (name) =>
  name.slice(((name.lastIndexOf(".") - 1) >>> 0) + 2);

export const getFileNameFromUrl = (url) => {
  return url.split("#").shift().split("?").shift().split("/").pop();
};

export const isValidImageType = (name, path) => {
  const ext = getFileExtension(name);
  const isResourceFork = path === "__MACOSX/";
  return !isResourceFork && IMAGE_TYPES.includes(ext);
};

export const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

export const clamp = (n, min, max) => {
  return Math.min(Math.max(n, min), max);
};

export const zoomToPercent = (zoom, targetZoom) => {
  return parseInt((zoom / targetZoom) * 100);
};

export const zoomClamp = (zoom, max, min) => {
  return clamp((zoom / 100) * max, min, max);
};

export const EasingFunctions = {
  // accelerating from zero velocity
  easeInQuart: (t) => t * t * t * t,
  // decelerating to zero velocity
  easeInOutQuart: (t) =>
    t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
  easeInOutQuart: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
};

const animationOptions = { easing: "easeInOutQuart", delay: 0, duration: 600, onAnimationEnd: () => {} }

export function animateTile(
  tile,
  property,
  target = 1.0,
  props = animationOptions
) {
  const { easing, delay, duration, onAnimationEnd } = { ...animationOptions, ...props }

  let origin = 0;
  let startTime = null;
  let delayTime = delay

  if (property === "opacity") {
    origin = tile.getOpacity();
  }

  function animate(timestamp) {
    // The first time we're running rAF, we need to set the anchor point as to which we're going to calculate our duration
    if (!startTime) {
      startTime = timestamp;
    }

    // How long have we been animating in total?
    let runtime = timestamp - startTime;

    // Handle delay
    if (delayTime && runtime <= delayTime ) {
      return requestAnimationFrame(animate);
    }

    // Reset time
    if (delayTime) {
      delayTime = 0;
      startTime = timestamp
      runtime = timestamp - startTime
    }



    // How much has our animation progressed relative to our duration goal?
    // The result is a number (float) between 0 and 1. So 0 is zero percent en 1 is one hundred percent.
    const relativeProgress = EasingFunctions[easing](runtime / duration );

    if (property === "opacity") {
      const distance = target - origin
      const progress = Math.min(relativeProgress, 1)
      const opacity = distance > 0 ?  target * progress  :  Math.abs(distance) - (Math.abs(distance) *  progress)
      tile.setOpacity(opacity);
    }

    if (runtime <= duration) {
      requestAnimationFrame(animate);
    } else {
      onAnimationEnd(tile);
    }

  }

  // We need to wrap animate in rAf in order to get passed the timestamp
  requestAnimationFrame(animate)
}
