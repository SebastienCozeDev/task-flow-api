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
      <div className="input">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-[1em] opacity-50">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
          />
        </svg>
        <input type="email" className="grow" placeholder="Email" value={data.value} onChange={data.onChange} />
      </div>
    </>
  );
}
