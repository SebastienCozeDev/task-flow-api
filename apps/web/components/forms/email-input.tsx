"use client";

import { ChangeEventHandler } from "react";

type EmailInputData = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement, HTMLInputElement>;
}

export default function EmailInput(data: EmailInputData) {
  return (
    <>
      <label className="label">Email</label>
      <input type="email" className="input" placeholder="Email" value={data.value} onChange={data.onChange} />
    </>
  );
}
