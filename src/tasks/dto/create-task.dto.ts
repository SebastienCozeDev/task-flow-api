import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { TaskDto } from './task.dto';


export class CreateTaskDto extends TaskDto {
    @ApiProperty({ description: 'The ID of the board of the task' })
    @IsString()
    boardId: string;

    @ApiPropertyOptional({ description: 'The assignee of the task' })
    @IsString()
    assignedToId?: string;

    constructor(partial: Partial<CreateTaskDto>) {
        super(partial);
    }
}
