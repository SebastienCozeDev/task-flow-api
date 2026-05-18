import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateBoardDto {
    @ApiProperty({ example: '1c0c8c84-2f3f-4115-be91-54b2837ca3e6', description: 'The ID of the board' })
    @IsString()
    id: string;

    @ApiPropertyOptional({ example: '1c0c8c84-2f3f-4115-be91-54b2837ca3e6', description: 'The ID of the new owner' })
    @IsOptional()
    @IsString()
    ownerId?: string;

    @ApiPropertyOptional({ example: 'My Super Board', description: 'The title of the board' })
    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(120)
    title?: string;

    @ApiPropertyOptional({ example: 'My Super Description', description: 'The description of the board' })
    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    description?: string;

    @ApiPropertyOptional({ example: 'password123', description: 'The password of the user' })
    @IsOptional()
    @IsString()
    password?: string;
}
