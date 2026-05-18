"use client";

import path from "path/win32";


type SvgIconProps = {
  d: string;
  className?: string;
};


export default function SvgIcon(props: SvgIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={props.className || "size-[1.2em]"}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={props.d}
      />
    </svg>
  );
}