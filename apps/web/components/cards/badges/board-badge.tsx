"use client";

import BoardSvgIcon from "@/components/icons/board-svg-icon";
import Link from "next/link";

type BoardBadgeProps = {
  href: string;
  title: string;
}

export default function BoardBadge(props: BoardBadgeProps) {
  return (
    <Link
      href={props.href}
      target="_blank"
      referrerPolicy="no-referrer"
      className="badge badge-outline"
    >
      <BoardSvgIcon />
      {props.title}
    </Link>
  );
}
