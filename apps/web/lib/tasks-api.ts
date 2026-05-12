import { apiFetch, createAPIEntity } from "./api";
import { UserResponse } from "./users-api";

/**
 * Data for task request & response.
 */
export type TaskInfo = {
  state?: string;
  decription?: string;
  imageLink?: string;
  moreLink?: string;
  dueDate?: string;
}



/**
 * Data for short task response.
 */
export type ShortTaskResponse = TaskInfo & {
  id: string;
  title: string;
}



/**
 * Data for short response.
 */
export type TaskResponse = ShortTaskResponse & {
  createdBy: UserResponse;
  lastUpdatedBy: UserResponse;
  assignedTo: UserResponse;
}



/**
 * Data for create task request.
 */
export type CreateTaskRequest = TaskInfo & {
  boardId: string;
  title: string;
  assignedToId?: string;
}



/**
 * Data for update task request.
 */
export type UpdateTaskRequest = TaskInfo & {
  title?: string;
  assignedToId?: string;
}



/**
 * Get assigned tasks from API.
 * @param token The access token
 * @returns The assigned tasks
 */
export async function getAssignedTasks(token: string): Promise<TaskResponse[] | null> {
  return apiFetch<TaskResponse[]>("/tasks", {
    method: "GET",
    token,
  });
}



/**
 * Get tasks of a specific board from API.
 * @param token The access token
 * @returns The tasks
 */
export async function getTasksOfBoard(boardId: string, token: string): Promise<TaskResponse[] | null> {
  return apiFetch<TaskResponse[]>(`/tasks/${boardId}`, {
    method: "GET",
    token,
  });
}



/**
 * Create a task with API.
 * @param data The data used to create the task
 * @param token The access token
 * @returns The new task
 */
export async function createTask(data: CreateTaskRequest, token: string): Promise<ShortTaskResponse | null> {
  return createAPIEntity<ShortTaskResponse>("/tasks", data, token);
}