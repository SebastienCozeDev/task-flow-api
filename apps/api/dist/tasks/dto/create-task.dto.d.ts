import { TaskDto } from './task.dto';
import { TaskState } from '../entities/task.entity';
export declare class CreateTaskDto extends TaskDto {
    boardId: string;
    title: string;
    state?: TaskState;
    assignedToId?: string;
    constructor(partial: Partial<CreateTaskDto>);
}
