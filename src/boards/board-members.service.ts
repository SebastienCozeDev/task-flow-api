import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { BoardMember } from "./entities/board-member.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { BoardMemberResponseDto } from "./dto/board-members/board-member-response.dto";
import { BoardMemberDetailResponseDto } from "./dto/board-members/board-member-detail-response.dto";
import { BoardsService } from "./boards.service";
import { UsersService } from "src/users/users.service";

@Injectable()
export class BoardMembersService {
    constructor(
        @InjectRepository(BoardMember)
        private readonly boardMembersRespository: Repository<BoardMember>,
        private readonly boardsService: BoardsService,
        private readonly usersService: UsersService,
    ) {}

    private toResponseDto(boardMember: BoardMember): BoardMemberResponseDto {
        return new BoardMemberResponseDto({
            id: boardMember.id,
            boardId: boardMember.boardId,
            userId: boardMember.userId,
            invitedById: boardMember.invitedById,
            role: boardMember.role,
        });
    }

    private toDetailResponseDto(boardMember: BoardMember): BoardMemberDetailResponseDto {
        return new BoardMemberDetailResponseDto({
            id: boardMember.id,
            board: this.boardsService.toResponseDto(boardMember.board),
            user: this.usersService.toResponseDto(boardMember.user),
            invitedBy: this.usersService.toResponseDto(boardMember.invitedBy),
            role: boardMember.role,
        });
    }
}
