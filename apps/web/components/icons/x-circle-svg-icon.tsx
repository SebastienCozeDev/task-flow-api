"use client";

import SvgIcon from "./svg-icon";


type XCircleSvgIconProps = {
  className?: string;
};


export default function XCircleSvgIcon(props: XCircleSvgIconProps) {
  return (
    <SvgIcon
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      className={props.className}
    />
  );
}
