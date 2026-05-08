import { Task } from "./entities/task.entity";
import { Repository } from "typeorm";
import { TaskDetailResponseDto } from "./dto/task-detail-response.dto";
import { UsersService } from "../users/users.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { DeleteResult } from "typeorm/browser";
import { BoardRightsService } from "../boards/board-rights.service";
import { BoardsService } from "../boards/boards.service";
import { DeletionResponseDto } from "../boards/dto/deletion-response.dto";
export declare class TasksService {
    private readonly tasksRepository;
    private readonly usersService;
    private readonly boardRightsService;
    private readonly boardsService;
    constructor(tasksRepository: Repository<Task>, usersService: UsersService, boardRightsService: BoardRightsService, boardsService: BoardsService);
    toDetailResponseDto(task: Task): TaskDetailResponseDto;
    findAllEntitiesByAssignedToId(assignedToId: string): Promise<Task[]>;
    findAllEntitiesByBoardId(boardId: string): Promise<Task[]>;
    findEntityById(id: string): Promise<Task>;
    createEntity(createTaskDto: CreateTaskDto, createdById: string): Promise<Task>;
    updateEntity(updateTaskDto: UpdateTaskDto, updatedById: string): Promise<Task>;
    deleteEntity(id: string): Promise<DeleteResult>;
    findAllByAssignedToId(assignedToId: string): Promise<TaskDetailResponseDto[]>;
    findAllByBoardId(boardId: string, currentUserId: string): Promise<TaskDetailResponseDto[]>;
    create(createTaskDto: CreateTaskDto, currentUserId: string): Promise<TaskDetailResponseDto>;
    update(updateTaskDto: UpdateTaskDto, currentUserId: string): Promise<TaskDetailResponseDto>;
    delete(id: string, currentUserId: string): Promise<DeletionResponseDto>;
}
