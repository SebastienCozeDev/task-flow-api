import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';


export class TaskDto {
    @ApiProperty({ example: 'My Super Task', description: 'The title of the task' })
    @IsString()
    title: string;

    @ApiPropertyOptional({ example: 'My Super Description', description: 'The description of the task' })
    @IsString()
    description?: string;

    @ApiPropertyOptional({ example: 'draft', description: 'The state of the task' })
    @IsString()
    state?: string;

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
