"use client";

import { ChangeEventHandler } from "react";
import AtSvgIcon from "../icons/at-svg-icon";

type EmailInputData = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement, HTMLInputElement>;
}

export default function EmailInput(data: EmailInputData) {
  return (
    <>
      <label className="label">Email</label>
      <div className="input">
        <AtSvgIcon className="h-[1em] opacity-50" />
        <input type="email" className="grow" placeholder="Email" value={data.value} onChange={data.onChange} />
      </div>
    </>
  );
}
