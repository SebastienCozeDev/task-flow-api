"use client";

import Link from "next/link";
import { ReactElement } from "react";


type SettingProps = {
  title: string;
  description?: string;
  svg?: ReactElement;
  href: string;
};


export default function Setting(props: SettingProps) {
  return (
    <li className="list-row">
      <div></div>
      <div>
        <div>{props.title}</div>
        <div className="text-xs font-semibold opacity-60">{ props.description ? props.description : "" }</div>
      </div>
      <Link className="btn btn-square btn-ghost" href={props.href}>
        {
          props.svg
          ? props.svg
          : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-[1.2em]">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
          )
        }
      </Link>
    </li>
  );
}