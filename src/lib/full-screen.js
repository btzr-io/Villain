/*
  Polyfill functions for the HTML5 fullscreen api:
  https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
*/

const prefixes = {
  exitFullscreen: [
    'exitFullscreen',
    'msExitFullscreen',
    'mozCancelFullScreen',
    'webkitExitFullscreen',
  ],
  fullscreenChange: [
    'fullscreenchange',
    'MSFullscreenChange',
    'mozfullscreenchange',
    'webkitfullscreenchange',
  ],
  fullscreenEnabled: [
    'fullscreenEnabled',
    'msFullscreenEnabled',
    'mozFullScreenEnabled',
    'webkitFullscreenEnabled',
  ],
  fullscreenElement: [
    'fullscreenElement',
    'msFullscreenElement',
    'mozFullScreenElement',
    'webkitFullscreenElement',
  ],
  requestFullscreen: [
    'requestFullscreen',
    'msRequestFullscreen',
    'mozRequestFullScreen',
    'webkitRequestFullscreen',
  ],
}

const getPrefix = () => {
  let prefixIndex = 0
  // validate prefix
  prefixes.fullscreenEnabled.some((prefix, index) => {
    if (document[prefix] || document[prefix] === false) {
      prefixIndex = index
      return true
    }
  })
  // prefix vendor index
  return prefixIndex
}

export const fullscreenElement = () => {
  const index = getPrefix()
  const prefix = prefixes.fullscreenElement[index]
  return document[prefix]
}

export const requestFullscreen = target => {
  const index = getPrefix()
  const prefix = prefixes.requestFullscreen[index]
  target[prefix] && target[prefix]()
}

export const exitFullscreen = () => {
  const index = getPrefix()
  const prefix = prefixes.exitFullscreen[index]
  document[prefix] && document[prefix]()
}

export const toggleFullscreen = target => {
  if (fullscreenElement()) {
    exitFullscreen()
  } else {
    requestFullscreen(target)
  }
}

export const onFullscreenChange = (target, action, callback) => {
  const index = getPrefix()
  const prefix = prefixes.fullscreenChange[index]
  target[`${action}EventListener`](prefix, callback, false)
}
