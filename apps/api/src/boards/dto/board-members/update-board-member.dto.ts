import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BoardMemberRole } from 'src/boards/entities/board-member.entity';


export class UpdateBoardMemberDto {
    @ApiProperty({ example: '1c0c8c84-2f3f-4115-be91-54b2837ca3e6', description: 'The ID of the board' })
    @IsString()
    boardId: string;

    @ApiProperty({ example: '1c0c8c84-2f3f-4115-be91-54b2837ca3e6', description: 'The ID of the invited user' })
    @IsString()
    userId: string;

    @ApiProperty({ example: 'reader', description: 'The role of the invited user' })
    @IsEnum(BoardMemberRole)
    role: BoardMemberRole;
}
