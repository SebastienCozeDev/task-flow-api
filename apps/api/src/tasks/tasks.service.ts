import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./entities/task.entity";
import { Repository } from "typeorm";
import { TaskDetailResponseDto } from "./dto/task-detail-response.dto";
import { UsersService } from "src/users/users.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { DeleteResult } from "typeorm/browser";
import { BoardRightsService } from "src/boards/board-rights.service";
import { BoardsService } from "src/boards/boards.service";
import { DeletionResponseDto } from "src/boards/dto/deletion-response.dto";


@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly tasksRepository: Repository<Task>,
        private readonly usersService: UsersService,
        private readonly boardRightsService: BoardRightsService,
        private readonly boardsService: BoardsService,
    ) {}

    /**
     * Convert Task entity to detail response DTO object
     * @param task The Task entity to convert
     * @returns The detail response DTO object
     */
    toDetailResponseDto(task: Task): TaskDetailResponseDto {
        const dto =  new TaskDetailResponseDto({
            description: task.description,
            imageLink: task.imageLink ?? undefined,
            moreLink: task.moreLink ?? undefined,
            dueDate: task.dueDate ?? undefined,
        });
        dto.id = task.id;
        dto.title = task.title;
        dto.state = task.state;
        dto.createdBy = task.createdBy ? this.usersService.toResponseDto(task.createdBy) : undefined;
        dto.lastUpdatedBy = task.lastUpdatedBy ? this.usersService.toResponseDto(task.lastUpdatedBy) : undefined;
        dto.assignedTo = task.assignedTo ? this.usersService.toResponseDto(task.assignedTo) : undefined;
        dto.board = task.board ? this.boardsService.toResponseDto(task.board) : undefined;
        return dto;
    }

    /**
     * Find all entities by assignedToId.
     * @param assignedToId The ID of the assignee
     * @returns The finded entities
     */
    async findAllEntitiesByAssignedToId(assignedToId: string): Promise<Task[]> {
        return await this.tasksRepository.find({
            where: { assignedToId },
            relations: ['createdBy', 'lastUpdatedBy', 'assignedTo', 'board'],
        });
    }

    /**
     * Find all entities by boardId.
     * @param boardId The ID of the board
     * @returns The finded entities
     */
    async findAllEntitiesByBoardId(boardId: string): Promise<Task[]> {
        return await this.tasksRepository.find({
            where: { boardId },
            relations: ['createdBy', 'lastUpdatedBy', 'assignedTo'],
        });
    }

    /**
     * Find one entity by its ID.
     * @param id The ID of the task
     * @returns The finded entity
     */
    async findEntityById(id: string): Promise<Task> {
        const task = await this.tasksRepository.findOneBy({ id });
        if (!task)
            throw new NotFoundException("Task not found");
        return task;
    }

    /**
     * Create a task entity.
     * @param createTaskDto The create task DTO object
     * @param createdById The ID of the creator
     * @returns The new task entity
     */
    async createEntity(createTaskDto: CreateTaskDto, createdById: string): Promise<Task> {
        const task = this.tasksRepository.create({
            ...createTaskDto,
            createdById: createdById,
            lastUpdatedById: createdById,
        });
        return await this.tasksRepository.save(task);
    }

    /**
     * Update a task entity.
     * @param updateTaskDto The update task DTO object
     * @param updatedById The ID of the updater
     * @returns The updated task
     */
    async updateEntity(updateTaskDto: UpdateTaskDto, updatedById: string): Promise<Task> {
        const { id, ...data } = updateTaskDto;
        await this.tasksRepository.update(id, {
            ...data,
            lastUpdatedById: updatedById,
        });
        return await this.findEntityById(id);
    }

    /**
     * Delete a task entity.
     * @param id The ID of the task to delete
     * @returns The delete result
     */
    async deleteEntity(id: string): Promise<DeleteResult> {
        return await this.tasksRepository.delete(id);
    }

    /**
     * Find all entities by assignedToId.
     * @param assignedToId The ID of the assignee
     * @returns The finded entities in DTO format
     */
    async findAllByAssignedToId(assignedToId: string): Promise<TaskDetailResponseDto[]> {
        return (await this.findAllEntitiesByAssignedToId(assignedToId)).map(
            (task => this.toDetailResponseDto(task))
        );
    }

    /**
     * Find all entities by boardId.
     * @param boardId The ID of the board
     * @returns The finded entities in DTO format
     */
    async findAllByBoardId(boardId: string, currentUserId: string): Promise<TaskDetailResponseDto[]> {
        await this.boardRightsService.isMemberOfBoard(
            await this.boardsService.findById(boardId),
            currentUserId,
        );
        return (await this.findAllEntitiesByBoardId(boardId)).map(
            (task => this.toDetailResponseDto(task))
        );
    }

    /**
     * Create a task entity.
     * @param createTaskDto The create task DTO object
     * @param createdById The ID of the creator
     * @returns The new task entity in DTO format
     */
    async create(createTaskDto: CreateTaskDto, currentUserId: string): Promise<TaskDetailResponseDto> {
        const board = await this.boardsService.findById(createTaskDto.boardId);
        await this.boardRightsService.hasRightToCreateTask(board, currentUserId);
        return this.toDetailResponseDto(await this.createEntity(createTaskDto, currentUserId));
    }

        /**
     * Update a task entity.
     * @param updateTaskDto The update task DTO object
     * @param updatedById The ID of the updater
     * @returns The updated task in DTO format
     */
    async update(updateTaskDto: UpdateTaskDto, currentUserId: string): Promise<TaskDetailResponseDto> {
        const task = await this.findEntityById(updateTaskDto.id);
        const board = await this.boardsService.findById(task.boardId);
        await this.boardRightsService.hasRightToUpdateTask(board, currentUserId, task);
        return this.toDetailResponseDto(await this.updateEntity(updateTaskDto, currentUserId));
    }

    /**
     * Delete a task entity.
     * @param id The ID of the task to delete
     * @returns The deletion confirmation in DTO format
     */
    async delete(id: string, currentUserId: string): Promise<DeletionResponseDto> {
        const task = await this.findEntityById(id);
        const board = await this.boardsService.findById(task.boardId);
        await this.boardRightsService.hasRightToDeleteTask(board, currentUserId, task);
        await this.deleteEntity(id);
        return new DeletionResponseDto({
            message: `(ID:${id} has been successfully deleted)`,
        });
    }
}
