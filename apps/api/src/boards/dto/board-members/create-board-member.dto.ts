import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BoardMemberRole } from 'src/boards/entities/board-member.entity';


export class CreateBoardMemberDto {
    @ApiProperty({ example: '1c0c8c84-2f3f-4115-be91-54b2837ca3e6', description: 'The ID of the board' })
    @IsString()
    boardId: string;

    @ApiProperty({ example: 'john.doe@example.com', description: 'The email address of the invited user' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'reader', description: 'The role of the invited user' })
    @IsEnum(BoardMemberRole)
    role: BoardMemberRole;
}
