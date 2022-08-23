import React, { memo, useState, useEffect, useCallback, Fragment } from "react";
import Button from "@/component/controls/button";

const Handle = ({
  domain: [min, max],
  handle: { id, value, percent },
  isActive,
  disabled,
  getHandleProps,
}) => {
  const [mouseOver, setMouseOver] = useState(false);

  const onMouseEnter = () => {
    setMouseOver(true);
  };

  const onMouseLeave = () => {
    setMouseOver(false);
  };

  const showTooltip = (mouseOver || isActive) && !disabled;

  return (
    <Fragment>
      {(mouseOver || isActive) && !disabled ? (
        <span
          className="tooltiptext"
          style={{
            left: `${percent}%`,
            top: 0,
            position: "absolute",
            transform: "translate(calc(-50% - 4px), -52px)",
          }}
        >
          {value}
        </span>
      ) : null}
      <Button
        role="slider"
        aria-label="Slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        style={{
          height: 14,
          width: 14,
          left: `${percent}%`,
          display: "block",
          position: "absolute",
          transform: "translate(-50%, -50%)",
          WebkitTapHighlightColor: "rgba(0,0,0,0)",
          border: 0,
          borderRadius: "50%",
          // backgroundColor: disabled ? 'transparent' : 'var(--slider-track-bg)',
          zIndex: 3,
          margin: 0,
          padding: 0,
          outline: "none",
        }}
        {...getHandleProps(id, {
          onMouseEnter: onMouseEnter,
          onMouseLeave: onMouseLeave,
        })}
      ></Button>
    </Fragment>
  );
};

export default memo(Handle);
