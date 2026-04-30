import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from 'src/users/dto/user-response.dto';


export class BoardResponseDto {
    @ApiProperty({ example: 'My Super Board', description: 'The title of the board' })
    title: string;

    @ApiProperty({ example: 'My Super Description', description: 'The description of the board' })
    description?: string;

    @ApiProperty({ description: 'The display name of the owner' })
    owner: UserResponseDto;

    constructor(partial: Partial<BoardResponseDto>) {
        Object.assign(this, partial);
    }
}
