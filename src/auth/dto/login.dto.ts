import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';


export class LoginDto {
    @ApiProperty({ example: 'john.doe@example.com', description: 'Your email address' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'password123', description: 'Your password' })
    @IsString()
    @IsNotEmpty()
    password: string;
}