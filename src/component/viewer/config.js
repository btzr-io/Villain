const space = 34;

const config = {
  // Init
  initialPage: 0,
  visibilityRatio: 1,
  imageLoaderLimit: 500,
  maxZoomPixelRatio: 1,
  viewportMargins: {
    top: space,
    bottom: 58 + space,
  },
  /*
  viewportMargins: {
    top: 35,
    bottom: 95,
  },
  */
  // Zoom - Pan
  constrainDuringPan: true,
  zoomPerScroll: 1.4,
  // Render
  // imageSmoothingEnabled: true,

  // UI
  toolbar: false,
  showNavigationControl: false,
  showHomeControl: false,
  showSequenceControl: false,
  showFullPageControl: false,

  // Interaction
  gestureSettingsMouse: {
    clickToZoom: false,
    flickEnabled: true,
    dblClickToZoom: true,
  },

  // --- Experimental ---
  //Flick bug -> placeholderFillStyle: '#FFF',
  // Animations
  alwaysBlend: true,
  blendTime: 0,
  springStiffness: 1,
  animationTime: 0.2,
};

export default config;
