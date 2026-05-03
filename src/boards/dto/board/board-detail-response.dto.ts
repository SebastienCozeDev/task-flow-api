import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UserResponseDto } from 'src/users/dto/user-response.dto';


export class BoardDetailResponseDto {
    @ApiProperty({ example: '1c0c8c84-2f3f-4115-be91-54b2837ca3e6', description: 'The ID of the board' })
    @IsString()
    id: string;

    @ApiProperty({ example: 'My Super Board', description: 'The title of the board' })
    @IsString()
    title: string;

    @ApiPropertyOptional({ example: 'My Super Description', description: 'The description of the board' })
    @IsString()
    description?: string;

    @ApiProperty({ description: 'The owner of the board' })
    @IsString()
    owner: UserResponseDto;

    constructor(partial: Partial<BoardDetailResponseDto>) {
        Object.assign(this, partial);
    }
}
