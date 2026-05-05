import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';


export class CreateTaskDto {
    @ApiProperty({ example: 'My Super Task', description: 'The title of the task' })
    @IsString()
    title: string;

    @ApiPropertyOptional({ example: 'My Super Description', description: 'The description of the task' })
    @IsString()
    description?: string | null;

    @ApiProperty({ example: 'draft', description: 'The state of the task' })
    state?: string | null;

    @ApiProperty({ example: 'https://sebastien.cozedev.com/img/icon.png', description: 'The image link of the task' })
    imageLink?: string | null;

    @ApiProperty({ example: 'https://sebastien.cozedev.com/', description: 'The link of the task to get more detail' })
    moreLink?: string | null;

    @ApiProperty({ description: 'The assignee of the task' })
    assignedToId?: string | null;

    constructor(partial: Partial<TaskDetailResponseDto>) {
        Object.assign(this, partial);
    }
}
