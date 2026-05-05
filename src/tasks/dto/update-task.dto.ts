import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { TaskDto } from './task.dto';


export class UpdateTaskDto extends TaskDto {
    @ApiPropertyOptional({ description: 'The assignee of the task' })
    @IsString()
    assignedToId?: string;

    constructor(partial: Partial<UpdateTaskDto>) {
        super(partial);
    }
}
