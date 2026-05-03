import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { BoardResponseDto } from '../board/board-response.dto';


export class BoardMemberDetailResponseDto {
    @ApiProperty({ example: '1c0c8c84-2f3f-4115-be91-54b2837ca3e6', description: 'The ID of the invited user' })
    @IsString()
    user: UserResponseDto;

    @ApiProperty({ example: '1c0c8c84-2f3f-4115-be91-54b2837ca3e6', description: 'The ID of the user who invited this user' })
    @IsString()
    invitedBy: UserResponseDto;

    @ApiProperty({ example: 'reader', description: 'The role of the invited user' })
    role: string;

    constructor(partial: Partial<BoardMemberDetailResponseDto>) {
        Object.assign(this, partial);
    }
}
