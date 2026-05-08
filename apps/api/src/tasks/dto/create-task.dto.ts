import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskDto } from './task.dto';
import { TaskState } from '../entities/task.entity';


export class CreateTaskDto extends TaskDto {
    @ApiProperty({ example: '1c0c8c84-2f3f-4115-be91-54b2837ca3e6', description: 'The ID of the board of the task' })
    @IsString()
    boardId: string;

    @ApiProperty({ example: 'My Super Task', description: 'The title of the task' })
    @IsString()
    title: string;

    @ApiPropertyOptional({ example: 'draft', description: 'The state of the task' })
    @IsOptional()
    @IsEnum(TaskState)
    state?: TaskState;

    @ApiPropertyOptional({ example: '1c0c8c84-2f3f-4115-be91-54b2837ca3e6', description: 'The assignee of the task' })
    @IsOptional()
    @IsString()
    assignedToId?: string;

    constructor(partial: Partial<CreateTaskDto>) {
        super(partial);
    }
}
