"use client";

import { getTodayAsIsoDate } from "@/lib/utils";

type DueDateBadgeProps = {
  date: string;
}

export default function DueDateBadge(props: DueDateBadgeProps) {
  const today = getTodayAsIsoDate();
  const isDueNowOrLate = data.date <= today;

  return (
    <div className={`badge ${isDueNowOrLate ? "badge-error" : "badge-outline"}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-[1.2em]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
      {data.date}
    </div>
  );
}
