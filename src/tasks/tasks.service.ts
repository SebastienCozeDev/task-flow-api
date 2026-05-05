import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./entities/task.entity";
import { Repository } from "typeorm";
import { TaskDetailResponseDto } from "./dto/task-detail-response.dto";
import { UsersService } from "src/users/users.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { DeleteResult } from "typeorm/browser";


@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly tasksRepository: Repository<Task>,
        private readonly usersService: UsersService,
    ) {}

    /**
     * Convert Task entity to detail response DTO object
     * @param task The Task entity to convert
     * @returns The detail response DTO object
     */
    toDetailResponseDto(task: Task): TaskDetailResponseDto {
        return new TaskDetailResponseDto({
            id: task.id,
            title: task.title,
            description: task.description,
            state: task.state,
            imageLink: task.imageLink ?? undefined,
            moreLink: task.moreLink ?? undefined,
            dueDate: task.dueDate ?? undefined,
            createdBy: task.createdBy ? this.usersService.toResponseDto(task.createdBy) : undefined,
            lastUpdatedBy: task.lastUpdatedBy ? this.usersService.toResponseDto(task.lastUpdatedBy) : undefined,
            assignedTo: task.assignedTo ? this.usersService.toResponseDto(task.assignedTo) : undefined,
        });
    }

    /**
     * Find all entities by assignedToId.
     * @param assignedToId The ID of the assignee
     * @returns The finded entities
     */
    async findAllEntitiesByAssignedToId(assignedToId: string): Promise<Task[]> {
        return await this.tasksRepository.find({
            where: { assignedToId },
            relations: ['createdBy', 'lastUpdatedBy', 'assignedTo'],
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
}
