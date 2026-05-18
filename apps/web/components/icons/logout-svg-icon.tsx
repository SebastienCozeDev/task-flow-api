"use client";

import SvgIcon from "./svg-icon";


type LogoutSvgIconProps = {
  className?: string;
};


export default function LogoutSvgIcon(props: LogoutSvgIconProps) {
  return (
    <SvgIcon
      d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
      className={props.className}
    />
  );
}
