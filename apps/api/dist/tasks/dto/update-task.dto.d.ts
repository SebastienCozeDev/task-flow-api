import { TaskDto } from './task.dto';
import { TaskState } from '../entities/task.entity';
export declare class UpdateTaskDto extends TaskDto {
    id: string;
    title?: string;
    state?: TaskState;
    assignedToId?: string;
    constructor(partial: Partial<UpdateTaskDto>);
}
