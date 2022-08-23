import React, { memo, useState, useCallback, Fragment } from "react";

const railOuterStyle = {
  position: "absolute",
  width: "100%",
  height: 20,
  transform: "translate(0%, -50%)",
  cursor: "pointer",
  zIndex: 3,
  top: "-5px",
};

const railInnerStyle = {
  position: "absolute",
  width: "100%",
  height: 5,
  transform: "translate(0%, -50%)",
  borderRadius: 4,
  pointerEvents: "none",
  backgroundColor: "rgb(250,250,250, 0.2)",
  boxShadow: "0 0 8ppx rgba(0, 0, 0, 0.2)",
};

function SliderRail({ activeHandleID, getEventData, getRailProps }) {
  return (
    <Fragment>
      <div style={railOuterStyle} {...getRailProps()} />
      <div style={railInnerStyle} />
    </Fragment>
  );
}

export default memo(SliderRail);
