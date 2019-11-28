import memoizeOne from 'memoize-one'

export const zoomClamp = (zoom, max, min) => {
  let clamp = (zoom / 100) * max
  // Fix max
  if (clamp > max) {
    clamp = max
  }
  // Fix min
  if (clamp < min) {
    clamp = min
  }

  return clamp
}

export const memoizeZoomClamp = memoizeOne(zoomClamp)

export const zoomPercent = (zoom, targetZoom) => parseInt((zoom / targetZoom) * 100)

export const memoizeZoomPercent = memoizeOne(zoomPercent)
