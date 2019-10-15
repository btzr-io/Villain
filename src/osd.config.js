const config = {
  // Init
  initialPage: 0,
  visibilityRatio: 1,
  imageLoaderLimit: 500,
  maxZoomPixelRatio: 1,
  // Zoom - Pan
  constrainDuringPan: true,
  preserveImageSizeOnResize: false,
  // Render
  // imageSmoothingEnabled: true,
  immediateRender: true,
  // UI
  toolbar: false,
  showNavigationControl: false,
  showHomeControl: false,
  showSequenceControl: false,
  showFullPageControl: false,

  // --- Experimental ---
  //Flick bug -> placeholderFillStyle: '#FFF',
  // Animations
  springStiffness: 12,
  animationTime: 0.9,
}

export default config
