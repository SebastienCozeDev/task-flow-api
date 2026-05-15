"use client";

import ColumnBoard from "@/components/boards/column-board";
import TaskCard from "@/components/cards/task-card";
import TasksDock from "@/components/docks/tasks-dock";
import { getAssignedTasks, TaskResponse } from "@/lib/api/tasks-api";
import { getAccessToken } from "@/lib/auth-storage";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type BoardColumn = {
  key: string;
  label: string;
};

const BOARD_COLUMNS: BoardColumn[] = [
  { key: "draft", label: "Draft" },
  { key: "todo", label: "Todo" },
  { key: "in_progress", label: "In progress" },
  { key: "done", label: "Done" },
  { key: "archived", label: "Archived" },
];

export default function MyTodoTasksPage() {
  const router = useRouter();

  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTasks() {
      const accessToken = getAccessToken();

      if (!accessToken) {
        setTasks([]);
        setIsLoading(false);
        return;
      }

      try {
        const assignedTasks = await getAssignedTasks(accessToken);

        if (!assignedTasks) {
          setTasks([]);
          return;
        }

        setTasks(assignedTasks);
      } catch {
        router.replace("/logout");
      } finally {
        setIsLoading(false);
      }
    }

    loadTasks();
  }, [router]);

  const tasksByState = useMemo(() => {
    return {
      draft: tasks.filter((task) => task.state === "draft"),
      todo: tasks.filter((task) => task.state === "todo"),
      in_progress: tasks.filter((task) => task.state === "in_progress"),
      done: tasks.filter((task) => task.state === "done"),
      archived: tasks.filter((task) => task.state === "archived"),
    };
  }, [tasks]);

  if (isLoading) {
    return <main className="px-4">Loading...</main>;
  }

  return (
    <>
      {/* Mobile / Tablet */}
      <div className="lg:hidden">
        <main className="mx-auto mb-32 w-full max-w-screen-xl px-4">
          <div className="grid grid-cols-1 gap-2">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </main>
        <TasksDock />
      </div>

      {/* Desktop board */}
      <main className="mx-auto hidden w-full max-w-[2000px] min-w-[1400px] px-4 pt-16 lg:block">
        <div className="grid grid-cols-5 gap-4">
          {BOARD_COLUMNS.map((column) => {
            const columnTasks =
              tasksByState[column.key as keyof typeof tasksByState];
            return (
              <ColumnBoard key={column.key} label={column.label} tasks={columnTasks} />
            );
          })}
        </div>
      </main>
    </>
  );
}