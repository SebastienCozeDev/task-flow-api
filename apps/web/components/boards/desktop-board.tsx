"use client";

import { DragDropProvider } from "@dnd-kit/react";
import { Dispatch, SetStateAction } from "react";
import ColumnBoard from "./column-board";
import { TaskResponse } from "@/lib/api/tasks-api";
import { TaskBoardColumnKey } from "@/app/(app)/tasks/page";

type BoardColumn = {
  key: string;
  label: string;
};

type DesktopBoardProps = {
  boardColumns: BoardColumn[];
  tasksByState: {};
  setTasks: Dispatch<SetStateAction<TaskResponse[]>>;
}

export default function DesktopBoard(props: DesktopBoardProps) {
  return (
    <main className="mx-auto hidden w-full max-w-[2000px] min-w-[1400px] px-4 pt-16 lg:block">
      <DragDropProvider
        onDragEnd={(event) => {
          if (event.canceled) return;

          const source = event.operation.source;
          const target = event.operation.target;

          if (!source || !target) return;

          const taskId = String(source.id);
          const newState = String(target.id) as TaskBoardColumnKey;

          props.setTasks((prevTasks) =>
            prevTasks.map((task) =>
              String(task.id) === taskId
              ? {...task, state: newState}
              : task
            )
          )

          // TODO: Call API after that
        }}
      >
        <div className="grid grid-cols-5 gap-4">
          {props.boardColumns.map((column) => {
            const columnTasks = props.tasksByState[column.key as keyof typeof props.tasksByState];
            return (
              <ColumnBoard key={column.key} id={column.key} label={column.label} tasks={columnTasks} />
            );
          })}
        </div>
      </DragDropProvider>
    </main>
  );
}
