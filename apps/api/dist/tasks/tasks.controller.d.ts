import { TasksService } from "./tasks.service";
import { TaskDetailResponseDto } from "./dto/task-detail-response.dto";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { DeletionResponseDto } from "../boards/dto/deletion-response.dto";
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    findAllByCurrentUser(req: any): Promise<TaskDetailResponseDto[]>;
    findAllByBoardId(req: any, boardId: string): Promise<TaskDetailResponseDto[]>;
    create(req: any, createTaskDto: CreateTaskDto): Promise<TaskDetailResponseDto>;
    update(req: any, updateTaskDto: UpdateTaskDto): Promise<TaskDetailResponseDto>;
    delete(req: any, taskId: string): Promise<DeletionResponseDto>;
}
