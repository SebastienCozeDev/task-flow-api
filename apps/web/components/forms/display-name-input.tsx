"use client";

import { ChangeEventHandler } from "react";
import UserSvgIcon from "../icons/user-svg-icon";

type DisplayNameInputData = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement, HTMLInputElement>;
}

export default function DisplayNameInput(data: DisplayNameInputData) {
  return (
    <>
      <label className="label">Display Name</label>
      <div className="input">
        <UserSvgIcon className="h-[1em] opacity-50" />
        <input type="text" className="grow" placeholder="Display Name" value={data.value} onChange={data.onChange} />
      </div>
    </>
  );
}
