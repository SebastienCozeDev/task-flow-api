import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';


export class BoardMemberResponseDto {
    @ApiProperty({ example: '1c0c8c84-2f3f-4115-be91-54b2837ca3e6', description: 'The ID of the relation' })
    @IsString()
    id: string;

    @ApiProperty({ example: '1c0c8c84-2f3f-4115-be91-54b2837ca3e6', description: 'The ID of the board' })
    @IsString()
    boardId: string;

    @ApiProperty({ example: '1c0c8c84-2f3f-4115-be91-54b2837ca3e6', description: 'The ID of the invited user' })
    @IsString()
    userId: string;

    @ApiProperty({ example: '1c0c8c84-2f3f-4115-be91-54b2837ca3e6', description: 'The ID of the user who invited this user' })
    @IsString()
    invitedById: string;

    @ApiProperty({ example: 'reader', description: 'The role of the invited user' })
    role: string;

    constructor(partial: Partial<BoardMemberResponseDto>) {
        Object.assign(this, partial);
    }
}
