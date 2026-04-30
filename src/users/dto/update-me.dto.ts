import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateMeDto {
    @ApiProperty({ example: 'John Doe', description: 'The display name of the user' })
    @IsOptional()
    @IsString()
    displayName?: string;

    @ApiProperty({ example: 'john.doe@example.com', description: 'The email address of the user' })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({ example: 'password123', description: 'The password of the user' })
    @IsString()
    password: string;

    @ApiProperty({ example: 'password123', description: 'The new password of the user' })
    @IsOptional()
    @IsString()
    @MinLength(8)
    newPassword?: string;
}
