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
exports.BoardRightsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const board_member_entity_1 = require("./entities/board-member.entity");
const typeorm_2 = require("@nestjs/typeorm");
let BoardRightsService = class BoardRightsService {
    boardMembersRespository;
    constructor(boardMembersRespository) {
        this.boardMembersRespository = boardMembersRespository;
    }
    async isMemberOfBoard(board, userId) {
        const boardMember = await this.boardMembersRespository.findOneBy({ boardId: board.id, userId });
        if (!boardMember)
            throw new common_1.ForbiddenException("The selected user or you are not a member of this board");
        return boardMember;
    }
    async isOwnerOfBoard(board, userId) {
        const boardMember = await this.isMemberOfBoard(board, userId);
        if (boardMember.role !== board_member_entity_1.BoardMemberRole.OWNER)
            throw new common_1.ForbiddenException("You are not owner of the board");
        return boardMember;
    }
    async isMaintainerOfBoard(board, userId) {
        const boardMember = await this.isMemberOfBoard(board, userId);
        if (!([board_member_entity_1.BoardMemberRole.OWNER, board_member_entity_1.BoardMemberRole.MAINTAINER].includes(boardMember.role)))
            throw new common_1.ForbiddenException("You are not maintainer of the board");
        return boardMember;
    }
    async isEditorOfBoard(board, userId) {
        const boardMember = await this.isMemberOfBoard(board, userId);
        if (!([board_member_entity_1.BoardMemberRole.OWNER, board_member_entity_1.BoardMemberRole.MAINTAINER, board_member_entity_1.BoardMemberRole.EDITOR].includes(boardMember.role)))
            throw new common_1.ForbiddenException("You are not editor of the board");
        return boardMember;
    }
    async hasRightToReadBoard(board, userId) {
        return await this.isMemberOfBoard(board, userId);
    }
    async hasRightToUpdateBoard(board, userId) {
        const boardMember = await this.isMemberOfBoard(board, userId);
        if (!([board_member_entity_1.BoardMemberRole.MAINTAINER, board_member_entity_1.BoardMemberRole.OWNER].includes(boardMember.role)))
            throw new common_1.ForbiddenException("You are not maintainer or owner of this board");
        return boardMember;
    }
    async hasRightToDeleteBoard(board, userId) {
        return await this.isOwnerOfBoard(board, userId);
    }
    async hasRightToInviteMemberInBoard(board, userId, invitedUserId) {
        const boardMember = await this.isMemberOfBoard(board, userId);
        const invitedMember = await this.isMemberOfBoard(board, invitedUserId);
        if (invitedMember)
            throw new common_1.ForbiddenException("The selected user is already invited");
        if ([board_member_entity_1.BoardMemberRole.OWNER, board_member_entity_1.BoardMemberRole.MAINTAINER].includes(boardMember.role))
            throw new common_1.ForbiddenException("You are not a owner or maintainer of this board");
        return boardMember;
    }
    async hasRightToUpdateMemberRoleInBoard(board, userId, updatedUserId, role) {
        const boardMember = await this.isMemberOfBoard(board, userId);
        const updatedMember = await this.isMemberOfBoard(board, updatedUserId);
        if ((boardMember.role != board_member_entity_1.BoardMemberRole.OWNER || role === board_member_entity_1.BoardMemberRole.OWNER)
            && (boardMember.role != board_member_entity_1.BoardMemberRole.MAINTAINER || [board_member_entity_1.BoardMemberRole.OWNER, board_member_entity_1.BoardMemberRole.MAINTAINER].includes(role)))
            throw new common_1.ForbiddenException("You are not a owner or maintainer of this board or the seleted role is too high");
        return [boardMember, updatedMember];
    }
    async hasRightToKickMemberInBoard(board, userId, kickedUserId) {
        const boardMember = await this.isMemberOfBoard(board, userId);
        const kickedMember = await this.isMemberOfBoard(board, kickedUserId);
        if (boardMember.role != board_member_entity_1.BoardMemberRole.OWNER && (kickedMember.invitedById != userId || boardMember.role != board_member_entity_1.BoardMemberRole.MAINTAINER))
            throw new common_1.ForbiddenException("You are not a owner of this board and you did not invite this member");
        return [boardMember, kickedMember];
    }
    async hasRightToCreateTask(board, userId) {
        return await this.isEditorOfBoard(board, userId);
    }
    async hasRightToUpdateTask(board, userId, task) {
        if (task.createdById === userId || task.assignedToId === userId) {
            return await this.isEditorOfBoard(board, userId);
        }
        return await this.isMaintainerOfBoard(board, userId);
    }
    async hasRightToDeleteTask(board, userId, task) {
        if (task.createdById === userId) {
            return await this.isEditorOfBoard(board, userId);
        }
        return await this.isMaintainerOfBoard(board, userId);
    }
};
exports.BoardRightsService = BoardRightsService;
exports.BoardRightsService = BoardRightsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(board_member_entity_1.BoardMember)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], BoardRightsService);
//# sourceMappingURL=board-rights.service.js.map