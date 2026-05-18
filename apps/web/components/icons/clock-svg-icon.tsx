"use client";

import SvgIcon from "./svg-icon";


type ClockSvgIconProps = {
  className?: string;
};


export default function ClockSvgIcon(props: ClockSvgIconProps) {
  return (
    <SvgIcon
      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      className={props.className}
    />
  );
}
