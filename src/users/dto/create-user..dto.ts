import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateUserDto {
    @ApiProperty({ example: 'John Doe', description: 'The display name of the user' })
    @IsString()
    @IsNotEmpty()
    displayName: string;

    @ApiProperty({ example: 'john.doe@example.com', description: 'The email address of the user' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'password123', description: 'The password of the user' })
    @IsString()
    @MinLength(8)
    password: string;
}
