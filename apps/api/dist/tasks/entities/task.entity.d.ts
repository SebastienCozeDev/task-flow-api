import { Board } from "../../boards/entities/board.entity";
import { User } from "../../users/entities/user.entity";
export declare enum TaskState {
    DRAFT = "draft",
    TODO = "todo",
    IN_PROGRESS = "in progress",
    DONE = "done",
    ARCHIVED = "archived"
}
export declare class Task {
    id: string;
    title: string;
    description?: string;
    boardId: string;
    createdById?: string;
    lastUpdatedById?: string;
    assignedToId?: string;
    state: TaskState;
    imageLink?: string;
    moreLink?: string;
    dueDate?: Date;
    createdAt: Date;
    updatedAt: Date;
    board: Board;
    createdBy?: User | null;
    lastUpdatedBy?: User | null;
    assignedTo?: User | null;
}
