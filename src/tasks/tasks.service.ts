import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./entities/task.entity";
import { Repository } from "typeorm";
import { TaskDetailResponseDto } from "./dto/task-detail-response.dto";
import { UsersService } from "src/users/users.service";


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
}
