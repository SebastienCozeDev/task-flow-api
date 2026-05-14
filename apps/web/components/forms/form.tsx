"use client";

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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{data.error}</span>
          </div>
        )
        : null
      }
    </form>
  );
}
