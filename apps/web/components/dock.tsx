"use client";

import { homeRoutes } from "@/lib/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Dock() {
  const pathname = usePathname();

  const isActive = (link: string) => {
    if (link === "/") return pathname === "/";
    return pathname === link || pathname.startsWith(`${link}/`);
  };

  return (
    <div className="dock dock-lg max-w-screen-lg mx-auto w-full">
      {homeRoutes.map((route) => (
        <Link
          key={route.link}
          href={route.link}
          className={isActive(route.link) ? "dock-active" : ""}
        >
          {route.svg}
          <span className="dock-label">{route.title}</span>
        </Link>
      ))}
    </div>
  );
}
