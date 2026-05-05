import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { TaskDto } from './task.dto';
import { TaskState } from '../entities/task.entity';


export class CreateTaskDto extends TaskDto {
    @ApiProperty({ description: 'The ID of the board of the task' })
    @IsString()
    boardId: string;

    @ApiProperty({ example: 'My Super Task', description: 'The title of the task' })
    @IsString()
    title: string;

    @ApiPropertyOptional({ example: 'draft', description: 'The state of the task' })
    @IsEnum(TaskState)
    state?: TaskState;

    @ApiPropertyOptional({ description: 'The assignee of the task' })
    @IsString()
    assignedToId?: string;

    constructor(partial: Partial<CreateTaskDto>) {
        super(partial);
    }
}
