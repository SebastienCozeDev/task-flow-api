"use client";

import Link from "next/link";

type CancelButtonData = {
  title: string;
  href: string;
}

export default function CancelButton(data: CancelButtonData) {
  return (
    <Link href={data.href} type="submit" className="btn btn-warning mt-4">{data.title}</Link>
  );
}
