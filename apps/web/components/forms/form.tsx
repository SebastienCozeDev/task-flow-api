"use client";

import XCircleSvgIcon from "../icons/x-circle-icon";

type FormData = {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error: string;
}

export default function Form(data: FormData) {
  return (
    <form onSubmit={data.onSubmit} className="flex w-full max-w-sm flex-col gap-4">  
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        {data.children}
      </fieldset>
      {
        data.error 
        ? (
          <div role="alert" className="alert alert-error w-xs border p-4">
            <XCircleSvgIcon className="h-6 w-6 shrink-0 stroke-current" />
            <span>{data.error}</span>
          </div>
        )
        : null
      }
    </form>
  );
}
