"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardMembersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const board_member_entity_1 = require("./entities/board-member.entity");
const typeorm_2 = require("@nestjs/typeorm");
const board_member_response_dto_1 = require("./dto/board-members/board-member-response.dto");
const board_member_detail_response_dto_1 = require("./dto/board-members/board-member-detail-response.dto");
const boards_service_1 = require("./boards.service");
const users_service_1 = require("../users/users.service");
const deletion_response_dto_1 = require("./dto/deletion-response.dto");
const board_rights_service_1 = require("./board-rights.service");
let BoardMembersService = class BoardMembersService {
    boardMembersRespository;
    boardsService;
    usersService;
    boardRightsService;
    constructor(boardMembersRespository, boardsService, usersService, boardRightsService) {
        this.boardMembersRespository = boardMembersRespository;
        this.boardsService = boardsService;
        this.usersService = usersService;
        this.boardRightsService = boardRightsService;
    }
    toResponseDto(boardMember) {
        return new board_member_response_dto_1.BoardMemberResponseDto({
            boardId: boardMember.boardId,
            userId: boardMember.userId,
            invitedById: boardMember.invitedById,
            role: boardMember.role,
        });
    }
    toDetailResponseDto(boardMember) {
        return new board_member_detail_response_dto_1.BoardMemberDetailResponseDto({
            user: this.usersService.toResponseDto(boardMember.user),
            invitedBy: this.usersService.toResponseDto(boardMember.invitedBy),
            role: boardMember.role,
        });
    }
    async findByAllBoardId(boardId) {
        const boardMembers = await this.boardMembersRespository.find({
            where: { boardId },
            relations: ['user', 'invitedBy'],
        });
        return boardMembers.map((boardMember) => this.toDetailResponseDto(boardMember));
    }
    async findByBoardAndUserIdsDetail(boardId, userId, currentUserId) {
        const board = await this.boardsService.findById(boardId);
        if (currentUserId)
            await this.boardRightsService.hasRightToReadBoard(board, currentUserId);
        const boardMember = await this.boardMembersRespository.findOne({
            where: { boardId, userId },
            relations: ['user', 'invitedBy'],
        });
        if (!boardMember)
            throw new common_1.NotFoundException("Board member not found");
        return this.toDetailResponseDto(boardMember);
    }
    async findByBoardAndUserIds(boardId, userId, currentUserId) {
        const board = await this.boardsService.findById(boardId);
        if (currentUserId)
            await this.boardRightsService.hasRightToReadBoard(board, currentUserId);
        const boardMember = await this.boardMembersRespository.findOne({
            where: { boardId, userId },
            relations: ['user', 'invitedBy'],
        });
        if (!boardMember)
            throw new common_1.NotFoundException("Board member not found");
        return boardMember;
    }
    async findBoardByIdWithDetail(boardId, userId) {
        const board = await this.boardsService.findByIdWithOwnerRelation(boardId, userId);
        const boardMembers = await this.findByAllBoardId(boardId);
        return await this.boardsService.toDetailResponseDto(board, boardMembers);
    }
    async create(createBoardMemberDto, currentUserId) {
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
    async update(updateBoardMemberDto, currentUserId) {
        const board = await this.boardsService.findById(updateBoardMemberDto.boardId);
        let boardMember;
        if (currentUserId)
            boardMember = (await this.boardRightsService.hasRightToUpdateMemberRoleInBoard(board, currentUserId, updateBoardMemberDto.userId, updateBoardMemberDto.role))[1];
        else
            boardMember = await this.findByBoardAndUserIds(updateBoardMemberDto.boardId, updateBoardMemberDto.userId);
        boardMember.role = updateBoardMemberDto.role;
        const updatedBoardMember = await this.boardMembersRespository.save(boardMember);
        return this.toResponseDto(updatedBoardMember);
    }
    async delete(boardId, userId, currentUserId) {
        const board = await this.boardsService.findById(boardId);
        let kickedMember;
        if (currentUserId)
            kickedMember = (await this.boardRightsService.hasRightToKickMemberInBoard(board, currentUserId, userId))[1];
        else
            kickedMember = await this.findByBoardAndUserIds(boardId, userId);
        this.boardMembersRespository.delete(kickedMember.id);
        return new deletion_response_dto_1.DeletionResponseDto({
            message: `(ID: ${userId}) has benn successfully deleted from (ID: ${boardId})`,
        });
    }
    async findBoardByMemberId(memberId) {
        const boardMembers = await this.boardMembersRespository.findBy({ userId: memberId });
        const boardIds = boardMembers.map(bm => bm.boardId);
        return await Promise.all(boardIds.map(async (boardId) => {
            return this.boardsService.toDetailResponseDto(await this.boardsService.findById(boardId, { relations: ['owner'] }), await this.findByAllBoardId(boardId));
        }));
    }
    async findBoardByOwnerId(ownerId) {
        const boardMembers = await this.boardMembersRespository.findBy({ userId: ownerId });
        const boardIds = boardMembers
            .filter(bm => bm.role === board_member_entity_1.BoardMemberRole.OWNER)
            .map(bm => bm.boardId);
        return await Promise.all(boardIds.map(async (boardId) => {
            return this.boardsService.toDetailResponseDto(await this.boardsService.findById(boardId), await this.findByAllBoardId(boardId));
        }));
    }
    async createBoard(currentUserId, createBoardDto) {
        const numberOfBoard = (await this.findBoardByOwnerId(currentUserId)).length;
        const savedBoard = await this.boardsService.create(currentUserId, createBoardDto, numberOfBoard);
        const boardMember = this.boardMembersRespository.create({
            boardId: savedBoard.id,
            userId: currentUserId,
            role: board_member_entity_1.BoardMemberRole.OWNER,
            invitedById: currentUserId,
        });
        await this.boardMembersRespository.save(boardMember);
        return savedBoard;
    }
};
exports.BoardMembersService = BoardMembersService;
exports.BoardMembersService = BoardMembersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(board_member_entity_1.BoardMember)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        boards_service_1.BoardsService,
        users_service_1.UsersService,
        board_rights_service_1.BoardRightsService])
], BoardMembersService);
//# sourceMappingURL=board-members.service.js.map