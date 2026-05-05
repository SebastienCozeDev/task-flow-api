import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { TaskDto } from './task.dto';


export class UpdateTaskDto extends TaskDto {
    @ApiProperty({ example: '1c0c8c84-2f3f-4115-be91-54b2837ca3e6', description: 'The ID of the task' })
    @IsString()
    id: string;

    @ApiPropertyOptional({ example: 'My Super Task', description: 'The title of the task' })
    @IsString()
    title?: string;

    @ApiPropertyOptional({ description: 'The assignee of the task' })
    @IsString()
    assignedToId?: string;

    constructor(partial: Partial<UpdateTaskDto>) {
        super(partial);
    }
}
