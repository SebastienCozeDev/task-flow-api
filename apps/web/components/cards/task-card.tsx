"use client";

import { TaskResponse } from "@/lib/api/tasks-api";
import Link from "next/link";
import MoreLinkBadge from "./badges/more-link-badge";
import DueDateBadge from "./badges/due-date-badge";

type TaskCardData = {
  task: TaskResponse
  showState?: boolean
}

export default function TaskCard(data: TaskCardData) {
  return (
    <div className="card bg-base-100 w-full shadow-sm mx-auto">
      {
        data.task.imageLink
        ? (
          <figure>
            <img
              src={data.task.imageLink}
              alt="Presentation image" />
          </figure>
        )
        : null
      }
      <div className="card-body">
        <h2 className="card-title">
          {data.task.title}
          {
            data.showState && data.task.state
            ? <div className="badge badge-secondary">{data.task.state.toUpperCase()}</div>
            : null
          }
        </h2>
        <p>{data.task.description}</p>
        <div className="card-actions justify-end">
          {
            data.task.dueDate
            ? <DueDateBadge date={data.task.dueDate} />
            : null
          }
          {
            data.task.moreLink
            ? <MoreLinkBadge href={data.task.moreLink} />
            : null
          }
        </div>
      </div>
    </div>
  );
}
