"use client";

import Link from "next/link";
import { ReactElement } from "react";


type SettingListProps = {
  title: string;
  children?: React.ReactNode;
};


export default function SettingList(props: SettingListProps) {
  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
        {props.title}
      </li>
      {props.children}
    </ul>
  );
}