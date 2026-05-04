import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Repository } from "typeorm";
import { BoardMember, BoardMemberRole } from "./entities/board-member.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { BoardMemberResponseDto } from "./dto/board-members/board-member-response.dto";
import { BoardMemberDetailResponseDto } from "./dto/board-members/board-member-detail-response.dto";
import { BoardsService } from "./boards.service";
import { UsersService } from "src/users/users.service";
import { Board } from "./entities/board.entity";
import { CreateBoardMemberDto } from "./dto/board-members/create-board-member.dto";
import { UpdateBoardMemberDto } from "./dto/board-members/update-board-member.dto";
import { BoardDetailResponseDto } from "./dto/board/board-detail-response.dto";
import { DeletionResponseDto } from "./dto/deletion-response.dto";
import { CreateBoardDto } from "./dto/board/create-board.dto";
import { BoardResponseDto } from "./dto/board/board-response.dto";
import { BoardRightsService } from "./board-rights.service";

@Injectable()
export class BoardMembersService {
    constructor(
        @InjectRepository(BoardMember)
        private readonly boardMembersRespository: Repository<BoardMember>,
        private readonly boardsService: BoardsService,
        private readonly usersService: UsersService,
        private readonly boardRightsService: BoardRightsService,
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

    private async findByAllBoardId(boardId: string): Promise<BoardMemberDetailResponseDto[]> {
        const boardMembers = await this.boardMembersRespository.find({
            where: { boardId },
            relations: ['user', 'invitedBy'],
        });
        return boardMembers.map(
            (boardMember: BoardMember) => this.toDetailResponseDto(boardMember)
        );
    }

    async findByBoardAndUserIdsDetail(boardId: string, userId: string, currentUserId?: string): Promise<BoardMemberDetailResponseDto> {
        const board = await this.boardsService.findById(boardId);
        if (currentUserId)
            await this.boardRightsService.hasRightToReadBoard(board, currentUserId);
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
        if (currentUserId)
            await this.boardRightsService.hasRightToReadBoard(board, currentUserId);
        const boardMember = await this.boardMembersRespository.findOne({
            where: { boardId, userId },
            relations: ['user', 'invitedBy'],
        });
        if (!boardMember)
            throw new NotFoundException("Board member not found");
        return boardMember;
    }

    async findBoardByIdWithDetail(boardId: string, userId?: string): Promise<BoardDetailResponseDto> {
        const board = await this.boardsService.findByIdWithOwnerRelation(boardId, userId)
        const boardMembers = await this.findByAllBoardId(boardId)
        return await this.boardsService.toDetailResponseDto(board, boardMembers);
    }

    async create(createBoardMemberDto: CreateBoardMemberDto, currentUserId: string): Promise<BoardMemberResponseDto> {
        const board = await this.boardsService.findById(createBoardMemberDto.boardId);
        const invitedUser = await this.usersService.findByEmail(createBoardMemberDto.email);
        await this.boardRightsService.hasRightToInviteMemberInBoard(board, currentUserId, invitedUser.id);
        const boardMember = this.boardMembersRespository.create({
            boardId: createBoardMemberDto.boardId,
            userId: invitedUser.id,
            invitedById: currentUserId,
        });
        const savedBoardMember = await this.boardMembersRespository.save(boardMember);
        return this.toResponseDto(savedBoardMember);
    }

    async update(updateBoardMemberDto: UpdateBoardMemberDto, currentUserId?: string): Promise<BoardMemberResponseDto> {
        const board = await this.boardsService.findById(updateBoardMemberDto.boardId);
        let boardMember: BoardMember;
        if (currentUserId)
            boardMember = (await this.boardRightsService.hasRightToUpdateMemberRoleInBoard(board, currentUserId, updateBoardMemberDto.userId, updateBoardMemberDto.role))[1];
        else
            boardMember = await this.findByBoardAndUserIds(updateBoardMemberDto.boardId, updateBoardMemberDto.userId);
        boardMember.role = updateBoardMemberDto.role;
        const updatedBoardMember = await this.boardMembersRespository.save(boardMember);
        return this.toResponseDto(updatedBoardMember);
    }

    async delete(boardId: string, userId: string, currentUserId?: string): Promise<DeletionResponseDto> {
        const board = await this.boardsService.findById(boardId);
        let kickedMember: BoardMember;
        if (currentUserId)
            kickedMember = (await this.boardRightsService.hasRightToKickMemberInBoard(board, currentUserId, userId))[1]
        else
            kickedMember = await this.findByBoardAndUserIds(boardId, userId);
        this.boardMembersRespository.delete(kickedMember.id);
        return new DeletionResponseDto({
            message: `(ID: ${userId}) has benn successfully deleted from (ID: ${boardId})`,
        })
    }

    async findBoardByMemberId(memberId: string): Promise<BoardDetailResponseDto[]> {
        const boardMembers = await this.boardMembersRespository.findBy({ userId: memberId });
        const boardIds = boardMembers.map(bm => bm.boardId);
        return await Promise.all(
            boardIds.map(async boardId => {
                return this.boardsService.toDetailResponseDto(
                    await this.boardsService.findById(boardId),
                    await this.findByAllBoardId(boardId),
                );
            })
        );
    }

    async findBoardByOwnerId(ownerId: string): Promise<BoardDetailResponseDto[]> {
        const boardMembers = await this.boardMembersRespository.findBy({ userId: ownerId });
        const boardIds = boardMembers
            .filter(bm => bm.role === BoardMemberRole.OWNER)
            .map(bm => bm.boardId);
        return await Promise.all(
            boardIds.map(async boardId => {
                return this.boardsService.toDetailResponseDto(
                    await this.boardsService.findById(boardId),
                    await this.findByAllBoardId(boardId),
                );
            })
        );
    }

    async createBoard(currentUserId: string, createBoardDto: CreateBoardDto): Promise<BoardResponseDto> {
        const numberOfBoard = (await this.findBoardByOwnerId(currentUserId)).length;
        const savedBoard = await this.boardsService.create(currentUserId, createBoardDto, numberOfBoard);
        const boardMember = this.boardMembersRespository.create({
            boardId: savedBoard.id,
            userId: currentUserId,
            role: BoardMemberRole.OWNER,
            invitedById: currentUserId,
        })
        await this.boardMembersRespository.save(boardMember);
        return savedBoard;
    }
}
