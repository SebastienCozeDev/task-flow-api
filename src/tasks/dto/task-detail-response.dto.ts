import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { TaskDto } from './task.dto';


export class TaskDetailResponseDto extends TaskDto {
    @ApiProperty({ example: '1c0c8c84-2f3f-4115-be91-54b2837ca3e6', description: 'The ID of the task' })
    @IsString()
    id: string;

    @ApiProperty({ example: 'draft', description: 'The state of the task' })
    @IsString()
    state: string;

    @ApiPropertyOptional({ description: 'The creator of the task' })
    createdBy?: UserResponseDto;

    @ApiPropertyOptional({ description: 'The user who last updated the task' })
    lastUpdatedBy?: UserResponseDto;

    @ApiPropertyOptional({ description: 'The assignee of the task' })
    assignedTo?: UserResponseDto | null;

    constructor(partial: Partial<TaskDetailResponseDto>) {
        super(partial);
    }
}
