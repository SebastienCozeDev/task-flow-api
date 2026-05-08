import { UserResponseDto } from "../../users/dto/user-response.dto";
import { TaskDto } from './task.dto';
import { TaskState } from '../entities/task.entity';
export declare class TaskDetailResponseDto extends TaskDto {
    id: string;
    title: string;
    state: TaskState;
    createdBy?: UserResponseDto;
    lastUpdatedBy?: UserResponseDto;
    assignedTo?: UserResponseDto;
    constructor(partial: Partial<TaskDetailResponseDto>);
}
