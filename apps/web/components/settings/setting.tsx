"use client";

import Link from "next/link";
import { ReactElement } from "react";
import OpenLinkInNewTabSvgIcon from "../icons/open-link-in-new-tab-svg-icon";


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
          : <OpenLinkInNewTabSvgIcon />
        }
      </Link>
    </li>
  );
}