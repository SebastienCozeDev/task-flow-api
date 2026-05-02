import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class CreateBoardDto {
    @ApiProperty({ example: 'My Super Board', description: 'The title of the board' })
    @IsString()
    @MinLength(3)
    @MaxLength(120)
    title: string;

    @ApiPropertyOptional({ example: 'My Super Description', description: 'The description of the board' })
    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(255)
    description?: string;
}
