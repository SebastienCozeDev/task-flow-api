"use client";

import { ChangeEventHandler } from "react";
import KeySvgIcon from "../icons/key-svg-icon";

type PasswordInputData = {
  onChange: ChangeEventHandler<HTMLInputElement, HTMLInputElement>;
}

export default function PasswordInput(data: PasswordInputData) {
  return (
    <>
      <label className="label">Password</label>
      <div className="input">
        <KeySvgIcon className="h-[1em] opacity-50" />
        <input type="password" className="grow" placeholder="Password" onChange={data.onChange} />
      </div>
    </>
  );
}
