import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class DeleteBoardDto {
    @ApiProperty({ example: '1c0c8c84-2f3f-4115-be91-54b2837ca3e6', description: 'The ID of the board' })
    @IsString()
    id: string;

    @ApiProperty({ example: 'password123', description: 'The password of the user' })
    @IsString()
    password: string;

    @ApiPropertyOptional({ example: 'true', description: 'Set true to delete permanently. You cannot restore the board after that.' })
    @IsOptional()
    @IsString()
    permanently?: boolean;
}
