"use client";

import { taskRoutes } from "@/lib/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TasksDock() {
  const pathname = usePathname();

  const isActive = (link: string) => {
    if (link === "/") return pathname === "/tasks/";
    return pathname === `/tasks${link}`;
  };

  return (
    <>
      <div className="dock dock-md fixed left-1/2 -translate-x-1/2 bottom-[72px]"></div>
      <div className="dock dock-md fixed left-1/2 -translate-x-1/2 bottom-[72px] max-w-screen-lg w-full">
        {taskRoutes.map((route) => (
          <Link
            key={route.link}
            href={`/tasks${route.link}`}
            className={isActive(route.link) ? "dock-active" : ""}
          >
            {route.svg}
            <span className="dock-label">{route.title}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
