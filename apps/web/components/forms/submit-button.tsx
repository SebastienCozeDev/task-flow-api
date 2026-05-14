"use client";

type SubmitButtonData = {
  title: string;
}

export default function SubmitButton(data: SubmitButtonData) {
  return (
    <button type="submit" className="btn btn-neutral mt-4">{data.title}</button>
  );
}
