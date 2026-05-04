import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Repository } from "typeorm";
import { BoardMember, BoardMemberRole } from "./entities/board-member.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { BoardMemberResponseDto } from "./dto/board-members/board-member-response.dto";
import { BoardMemberDetailResponseDto } from "./dto/board-members/board-member-detail-response.dto";
import { BoardsService } from "./boards.service";
import { UsersService } from "src/users/users.service";
import { BoardDetailResponseDto } from "./dto/board/board-detail-response.dto";
import { Board } from "./entities/board.entity";
import { CreateBoardMemberDto } from "./dto/board-members/create-board-member.dto";
import { UpdateBoardMemberDto } from "./dto/board-members/update-board-member.dto";
import { User } from "src/users/entities/user.entity";

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
            boardId: boardMember.boardId,
            userId: boardMember.userId,
            invitedById: boardMember.invitedById,
            role: boardMember.role,
        });
    }

    private toDetailResponseDto(boardMember: BoardMember): BoardMemberDetailResponseDto {
        return new BoardMemberDetailResponseDto({
            user: this.usersService.toResponseDto(boardMember.user),
            invitedBy: this.usersService.toResponseDto(boardMember.invitedBy),
            role: boardMember.role,
        });
    }

    private async hasRightToInvite(board: Board, userId: string, boardMember?: BoardMember): Promise<boolean> {
        if (!boardMember)
            boardMember = await this.findByBoardAndUserIds(board.id, userId);
        return boardMember && (
            boardMember.role === BoardMemberRole.OWNER
            || boardMember.role === BoardMemberRole.MAINTENER
        );
    }

    private async hasRightToUpdateRole(board: Board, userId: string, role: BoardMemberRole,): Promise<boolean> {
        const boardMember = await this.findByBoardAndUserIds(board.id, userId);
        return (await this.hasRightToInvite(board, userId, boardMember)) && (
            (boardMember.role === BoardMemberRole.OWNER && role in [BoardMemberRole.OWNER, BoardMemberRole.MAINTENER, BoardMemberRole.EDITOR, BoardMemberRole.MAINTENER])
            || (boardMember.role === BoardMemberRole.OWNER && role in [BoardMemberRole.OWNER, BoardMemberRole.MAINTENER, BoardMemberRole.EDITOR])
        )
    }

    private async findByBoardAndUserIdsDetail(boardId: string, userId: string, currentUserId?: string): Promise<BoardMemberDetailResponseDto> {
        const board = await this.boardsService.findById(boardId);
        if (currentUserId && !this.boardsService.hasRightToRead(board, currentUserId))
            throw new UnauthorizedException("Unauthorized");
        const boardMember = await this.boardMembersRespository.findOne({
            where: { boardId, userId },
            relations: ['user', 'invitedBy'],
        });
        if (!boardMember)
            throw new NotFoundException("Board member not found");
        return this.toDetailResponseDto(boardMember);
    }

    private async findByBoardAndUserIds(boardId: string, userId: string, currentUserId?: string): Promise<BoardMember> {
        const board = await this.boardsService.findById(boardId);
        if (currentUserId && !this.boardsService.hasRightToRead(board, currentUserId))
            throw new UnauthorizedException("Unauthorized");
        const boardMember = await this.boardMembersRespository.findOne({
            where: { boardId, userId },
            relations: ['user', 'invitedBy'],
        });
        if (!boardMember)
            throw new NotFoundException("Board member not found");
        return boardMember;
    }

    private async findAllByBoardId(boardId: string, currentUserId?: string): Promise<BoardMemberDetailResponseDto[]> {
        const board = await this.boardsService.findById(boardId);
        if (currentUserId && !this.boardsService.hasRightToRead(board, currentUserId))
            throw new UnauthorizedException("Unauthorized");
        const boardMembers = await this.boardMembersRespository.find({
            where: { boardId },
            relations: ['user', 'invitedBy'],
        });
        return boardMembers.map(
            (boardMember: BoardMember) => this.toDetailResponseDto(boardMember)
        );
    }

    private async create(createBoardMemberDto: CreateBoardMemberDto, currentUserId?: string): Promise<BoardMemberResponseDto> {
        const board = await this.boardsService.findById(createBoardMemberDto.boardId);
        if (currentUserId && !this.hasRightToInvite(board, currentUserId))
            throw new UnauthorizedException("Unauthorized");
        const invitedUser = this.usersService.findByEmail(createBoardMemberDto.email);
        const boardMember = this.boardMembersRespository.create({
            boardId: createBoardMemberDto.boardId,
            userId: (await invitedUser).id,
            invitedById: currentUserId,
        });
        const savedBoardMember = await this.boardMembersRespository.save(boardMember);
        return this.toResponseDto(savedBoardMember);
    }

    private async update(updateBoardMemberDto: UpdateBoardMemberDto, currentUserId?: string): Promise<BoardMemberResponseDto> {
        const board = await this.boardsService.findById(updateBoardMemberDto.boardId);
        if (currentUserId && !this.hasRightToUpdateRole(board, currentUserId, updateBoardMemberDto.role))
            throw new UnauthorizedException("Unauthorized");
        const boardMember = await this.findByBoardAndUserIds(updateBoardMemberDto.boardId, updateBoardMemberDto.userId);
        boardMember.role = updateBoardMemberDto.role;
        const updatedBoardMember = await this.boardMembersRespository.save(boardMember);
        return this.toResponseDto(updatedBoardMember);
    }
}
