import React, { useRef, useState, useEffect } from "react";
import clsx from "clsx";
import { Icon } from "@mdi/react";

const Button = ({
  icon,
  iconSize,
  focus,
  label,
  title,
  active,
  tooltip,
  onClick,
  children,
  typeClass,
  tooltipPlacement,
  ...otherProps
}) => {
  const containerProps = { ...otherProps };
  const otherButtonProps = !tooltip ? containerProps : {};
  const elementRef = useRef(null);

  useEffect(() => {
    if (elementRef.current && focus) {
      elementRef.current.focus();
    }
  }, [elementRef.current, focus]);

  return (
    <button
      ref={elementRef}
      title={title}
      onClick={onClick}
      aria-label={tooltip}
      className={clsx(
        "villain-button",
        typeClass && `villain-button--${typeClass}`,
        active && "villain-button--active"
      )}
      {...otherButtonProps}
    >
      {icon && <Icon path={icon} size={iconSize || 0.98} />}
      {label && <span className={"villain-button__label"}>{label}</span>}
      {children}
    </button>
  );
};

export default Button;
