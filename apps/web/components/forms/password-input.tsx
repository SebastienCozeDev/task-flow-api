"use client";

import { ChangeEventHandler } from "react";

type PasswordInputData = {
  onChange: ChangeEventHandler<HTMLInputElement, HTMLInputElement>;
}

export default function PasswordInput(data: PasswordInputData) {
  return (
    <>
      <label className="label">Password</label>
      <input type="password" className="input" placeholder="Password" onChange={data.onChange} />
    </>
  );
}
