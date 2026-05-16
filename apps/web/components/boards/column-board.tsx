"use client";

import { useDroppable } from "@dnd-kit/react";
import { TaskResponse } from "@/lib/api/tasks-api";
import DraggableCard from "../cards/draggable-card";
import TaskCard from "../cards/task-card";

type ColumnBoardProps = {
  id: string;
  label: string;
  tasks: TaskResponse[];
}

export default function ColumnBoard(props: ColumnBoardProps) {
  const { ref, isDropTarget } = useDroppable({ id: props.id });

  return (
    <section
      ref={ref}
      className={`rounded-box p-3 transition-colors ${
        isDropTarget ? "bg-base-300" : "bg-base-200"
      }`}
      id={props.id}
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-semibold">{props.label}</h2>
        <span className="badge badge-neutral badge-sm">
          {props.tasks.length}
        </span>
      </div>

      <div className="flex max-h-[calc(100vh-220px)] flex-col gap-3 overflow-y-auto">
        {props.tasks.length > 0 ? (
          props.tasks.map((task) => (
            <DraggableCard key={task.id} id={task.id}>
              <TaskCard task={task} />
            </DraggableCard>
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
