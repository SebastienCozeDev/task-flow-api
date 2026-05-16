import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { TaskDto } from './task.dto';
import { TaskState } from '../entities/task.entity';
import { BoardResponseDto } from 'src/boards/dto/board/board-response.dto';


export class TaskDetailResponseDto extends TaskDto {
    @ApiProperty({ example: '1c0c8c84-2f3f-4115-be91-54b2837ca3e6', description: 'The ID of the task' })
    @IsString()
    id: string;

    @ApiProperty({ example: 'My Super Task', description: 'The title of the task' })
    @IsString()
    title: string;

    @ApiPropertyOptional({ description: 'The ID of the board of the task' })
    @IsOptional()
    board?: BoardResponseDto;

    @ApiProperty({ example: 'draft', description: 'The state of the task' })
    @IsEnum(TaskState)
    state: TaskState;

    @ApiPropertyOptional({ example: '1c0c8c84-2f3f-4115-be91-54b2837ca3e6', description: 'The creator of the task' })
    @IsOptional()
    createdBy?: UserResponseDto;

    @ApiPropertyOptional({ example: '1c0c8c84-2f3f-4115-be91-54b2837ca3e6', description: 'The user who last updated the task' })
    @IsOptional()
    lastUpdatedBy?: UserResponseDto;

    @ApiPropertyOptional({ example: '1c0c8c84-2f3f-4115-be91-54b2837ca3e6', description: 'The assignee of the task' })
    @IsOptional()
    assignedTo?: UserResponseDto;

    constructor(partial: Partial<TaskDetailResponseDto>) {
        super(partial);
    }
}
