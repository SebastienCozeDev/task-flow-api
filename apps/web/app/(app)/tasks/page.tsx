"use client";

import DesktopBoard from "@/components/boards/desktop-board";
import TaskCard from "@/components/cards/task-card";
import { getAssignedTasks, TaskResponse } from "@/lib/api/tasks-api";
import { getAccessToken } from "@/lib/auth-storage";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";



export type TasksByState = {
  draft: TaskResponse[];
  todo: TaskResponse[];
  inProgress: TaskResponse[];
  done: TaskResponse[];
  archived: TaskResponse[];
}



export default function MyAssignedTasksPage() {
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

  const tasksByState = useMemo<TasksByState>(() => {
    return {
      draft: tasks.filter((task) => task.state === "draft"),
      todo: tasks.filter((task) => task.state === "todo"),
      inProgress: tasks.filter((task) => task.state === "in_progress"),
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
              <TaskCard key={task.id} task={task} showState={true} />
            ))}
          </div>
        </main>
      </div>

      {/* Desktop board */}
      <DesktopBoard
        boardColumns={[
          { key: "draft", label: "Draft" },
          { key: "todo", label: "Todo" },
          { key: "in_progress", label: "In progress" },
          { key: "done", label: "Done" },
          { key: "archived", label: "Archived" },
        ]}
        tasksByState={tasksByState}
        setTasks={setTasks}
      />
    </>
  );
}
