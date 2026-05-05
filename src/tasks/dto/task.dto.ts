import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';


export class TaskDto {
    @ApiPropertyOptional({ example: 'My Super Description', description: 'The description of the task' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({ example: 'https://sebastien.cozedev.com/img/icon.png', description: 'The image link of the task' })
    @IsOptional()
    @IsString()
    imageLink?: string;

    @ApiPropertyOptional({ example: 'https://sebastien.cozedev.com/', description: 'The link of the task to get more detail' })
    @IsOptional()
    @IsString()
    moreLink?: string;

    @ApiPropertyOptional({ example: '2026-05-05', description: 'The due date of the task' })
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    dueDate?: Date;

    constructor(partial: Partial<TaskDto>) {
        Object.assign(this, partial);
    }
}
