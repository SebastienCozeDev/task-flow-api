"use client";

import { Dispatch, SetStateAction } from "react";
import ColumnBoard from "./column-board";
import { TaskResponse } from "@/lib/api/tasks-api";

type BoardColumn = {
  key: string;
  label: string;
};

type DesktopBoardData = {
  boardColumns: BoardColumn[];
  tasksByState: {};
  setTasks: Dispatch<SetStateAction<TaskResponse[]>>;
}

export default function DesktopBoard(data: DesktopBoardData) {
  return (
    <main className="mx-auto hidden w-full max-w-[2000px] min-w-[1400px] px-4 pt-16 lg:block">
      <div className="grid grid-cols-5 gap-4">
        {data.boardColumns.map((column) => {
          const columnTasks =
            data.tasksByState[column.key as keyof typeof data.tasksByState];
          return (
            <ColumnBoard key={column.key} label={column.label} tasks={columnTasks} />
          );
        })}
      </div>
    </main>
  );
}
