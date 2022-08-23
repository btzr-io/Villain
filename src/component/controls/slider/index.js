import React, { useState, useEffect, memo } from "react";
import { Slider, Rail, Handles, Tracks } from "react-compound-slider";
import Handle from "./handle";
import SliderRail from "./sliderRail";

const sliderStyle = {
  position: "relative",
  width: "100%",
  borderRadius: "4px",
  justifyContent: "center",
  zIndex: 99,
};

function Track({ source, target, getTrackProps, disabled }) {
  return (
    <div
      style={{
        position: "absolute",
        transform: "translate(0%, -50%)",
        height: 5,
        zIndex: 1,
        backgroundColor: "var(--main-color)",
        borderRadius: 4,
        cursor: "pointer",
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      {...getTrackProps()}
    />
  );
}

const BufferLoader = memo(({ bufferProgress, reversed }) => {
  return (
    <div
      className={"villain-slider__buffer"}
      style={{
        width: `${bufferProgress}%`,
        right: reversed ? 0 : "initial",
      }}
    />
  );
});

const defaultValues = [1];

const SliderUI = memo(
  ({ max = 1, value = 0, reversed = false, bufferProgress = 0, onChange }) => {
    const [seeking, setSeeking] = useState(false);
    const [values, setValues] = useState(defaultValues.slice());
    let changes = 0;
    const domain = [1, max];

    if (max == 1) return null;

    const handleChange = (values) => {
      setSeeking(false);
      onChange(values[0] - 1);
    };

    useEffect(() => {
      if (!seeking) setValues([value]);
    }, [seeking, value]);

    return (
      <div className="villain-slider" style={{ height: sliderStyle.height }}>
        <Slider
          rootStyle={sliderStyle}
          domain={domain}
          step={1}
          mode={2}
          values={values}
          onChange={handleChange}
          reversed={reversed}
        >
          <Rail>{(railProps) => <SliderRail {...railProps} />}</Rail>

          <Handles>
            {({ handles, activeHandleID, getHandleProps }) => (
              <div className="villain-slider__handles">
                {handles.map((handle) => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    isActive={handle.id === activeHandleID}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>

          <Tracks right={reversed} left={!reversed}>
            {({ tracks, getTrackProps }) => (
              <div className="villain-slider__tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Tracks>
        </Slider>
        <BufferLoader bufferProgress={bufferProgress} reversed={reversed} />
      </div>
    );
  }
);

export default SliderUI;
