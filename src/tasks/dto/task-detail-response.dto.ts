import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UserResponseDto } from 'src/users/dto/user-response.dto';


export class TaskDetailResponseDto {
    @ApiProperty({ example: '1c0c8c84-2f3f-4115-be91-54b2837ca3e6', description: 'The ID of the task' })
    @IsString()
    id: string;

    @ApiProperty({ example: 'My Super Task', description: 'The title of the task' })
    @IsString()
    title: string;

    @ApiPropertyOptional({ example: 'My Super Description', description: 'The description of the task' })
    @IsString()
    description?: string;

    @ApiProperty({ example: 'draft', description: 'The state of the task' })
    state: string;

    @ApiProperty({ example: 'https://sebastien.cozedev.com/img/icon.png', description: 'The image link of the task' })
    imageLink?: string | null;

    @ApiProperty({ example: 'https://sebastien.cozedev.com/', description: 'The link of the task to get more detail' })
    moreLink?: string | null;

    @ApiProperty({ description: 'The creator of the task' })
    createdBy: UserResponseDto;

    @ApiProperty({ description: 'The user who last updated the task' })
    lastUpdatedBy: UserResponseDto;

    @ApiProperty({ description: 'The assignee of the task' })
    assignedTo: UserResponseDto;

    constructor(partial: Partial<TaskDetailResponseDto>) {
        Object.assign(this, partial);
    }
}
