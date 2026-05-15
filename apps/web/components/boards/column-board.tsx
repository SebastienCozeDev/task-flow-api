"use client";

import { TaskResponse } from "@/lib/api/tasks-api";
import TaskCard from "../cards/task-card";

type ColumnBoardData = {
  label: string
  tasks: TaskResponse[]
}

export default function ColumnBoard(data: ColumnBoardData) {
  return (
    <section
      className="rounded-box bg-base-200 p-3"
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-semibold">{data.label}</h2>
        <span className="badge badge-neutral badge-sm">
          {data.tasks.length}
        </span>
      </div>

      <div className="flex max-h-[calc(100vh-220px)] flex-col gap-3 overflow-y-auto">
        {data.tasks.length > 0 ? (
          data.tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))
        ) : (
          <div className="rounded-box border border-dashed border-base-300 bg-base-100 p-4 text-sm text-base-content/60">
            No task
          </div>
        )}
      </div>
    </section>
  );
}
