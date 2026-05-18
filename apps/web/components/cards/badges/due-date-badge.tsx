"use client";

import ClockSvgIcon from "@/components/icons/clock-svg-icon";
import { getTodayAsIsoDate } from "@/lib/utils";

type DueDateBadgeProps = {
  date: string;
}

export default function DueDateBadge(props: DueDateBadgeProps) {
  const today = getTodayAsIsoDate();
  const isDueNowOrLate = props.date <= today;

  return (
    <div className={`badge ${isDueNowOrLate ? "badge-error" : "badge-outline"}`}>
      <ClockSvgIcon />
      {props.date}
    </div>
  );
}
