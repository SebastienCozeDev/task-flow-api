import { ApiProperty } from '@nestjs/swagger';


export class UserResponseDto {
    @ApiProperty({ example: 584, description: 'The ID of the user' })
    id: string;

    @ApiProperty({ example: 'John Doe', description: 'The display name of the user' })
    displayName: string;

    @ApiProperty({ example: 'john.doe@example.com', description: 'The email address of the user' })
    email: string;

    constructor(partial: Partial<UserResponseDto>) {
        Object.assign(this, partial);
    }
}
