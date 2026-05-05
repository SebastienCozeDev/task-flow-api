import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsEnum, IsString } from 'class-validator';
import { TaskState } from '../entities/task.entity';


export class TaskDto {
    @ApiPropertyOptional({ example: 'My Super Description', description: 'The description of the task' })
    @IsString()
    description?: string;

    @ApiPropertyOptional({ example: 'https://sebastien.cozedev.com/img/icon.png', description: 'The image link of the task' })
    @IsString()
    imageLink?: string;

    @ApiPropertyOptional({ example: 'https://sebastien.cozedev.com/', description: 'The link of the task to get more detail' })
    @IsString()
    moreLink?: string;

    @ApiPropertyOptional({ description: 'The due date of the task' })
    @IsDate()
    dueDate?: Date;

    constructor(partial: Partial<TaskDto>) {
        Object.assign(this, partial);
    }
}
