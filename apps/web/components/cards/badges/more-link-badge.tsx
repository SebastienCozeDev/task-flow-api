"use client";

import OpenLinkInNewTabSvgIcon from "@/components/icons/open-link-in-new-tab-svg-icon";
import Link from "next/link";

type MoreLinkBadgeProps = {
  href: string;
}

export default function MoreLinkBadge(props: MoreLinkBadgeProps) {
  return (
    <Link
      href={props.href}
      target="_blank"
      referrerPolicy="no-referrer"
      className="badge badge-outline"
    >
      <OpenLinkInNewTabSvgIcon />
      See more
    </Link>
  );
}
