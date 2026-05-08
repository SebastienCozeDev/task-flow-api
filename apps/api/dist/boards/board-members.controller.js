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
exports.BoardMembersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const board_members_service_1 = require("./board-members.service");
const roles_guard_1 = require("../auth/roles.guard");
const passport_1 = require("@nestjs/passport");
const roles_decorator_1 = require("../auth/roles.decorator");
const create_board_member_dto_1 = require("./dto/board-members/create-board-member.dto");
const update_board_member_dto_1 = require("./dto/board-members/update-board-member.dto");
let BoardMembersController = class BoardMembersController {
    boardMembersService;
    constructor(boardMembersService) {
        this.boardMembersService = boardMembersService;
    }
    async findById(req, boardId, userId) {
        return await this.boardMembersService.findByBoardAndUserIdsDetail(boardId, userId, req.user.userId);
    }
    async findByIdByAdmin(req, boardId, userId) {
        return await this.boardMembersService.findByBoardAndUserIdsDetail(boardId, userId);
    }
    create(req, createBoardMemberDto) {
        return this.boardMembersService.create(createBoardMemberDto, req.user.userId);
    }
    update(req, updateBoardMemberDto) {
        return this.boardMembersService.update(updateBoardMemberDto, req.user.userId);
    }
    updateByAdmin(req, updateBoardMemberDto) {
        return this.boardMembersService.update(updateBoardMemberDto);
    }
    delete(req, boardId, userId) {
        return this.boardMembersService.delete(boardId, userId, req.user.userId);
    }
    deleteByAdmin(req, boardId, userId) {
        return this.boardMembersService.delete(boardId, userId);
    }
};
exports.BoardMembersController = BoardMembersController;
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('me/:boardId/members/:userId'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve a specific board member by board and user ID' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('boardId')),
    __param(2, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], BoardMembersController.prototype, "findById", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.Get)(':boardId/members/:userId'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve a specific board member by board and user ID with admin privilege' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('boardId')),
    __param(2, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], BoardMembersController.prototype, "findByIdByAdmin", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('members'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Invite a member in a specific board' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_board_member_dto_1.CreateBoardMemberDto]),
    __metadata("design:returntype", Promise)
], BoardMembersController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Patch)('members'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update the role of a specific user in a specific board' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_board_member_dto_1.UpdateBoardMemberDto]),
    __metadata("design:returntype", Promise)
], BoardMembersController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.Patch)('members/force'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update the role of a specific member in a specific board with admin privilege' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_board_member_dto_1.UpdateBoardMemberDto]),
    __metadata("design:returntype", Promise)
], BoardMembersController.prototype, "updateByAdmin", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Delete)(':userId/members/:boardId'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a specifc member of a specific board' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('boardId')),
    __param(2, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], BoardMembersController.prototype, "delete", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.Delete)('force'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a specifc member of a specific board with admin privilege' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('boardId')),
    __param(2, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], BoardMembersController.prototype, "deleteByAdmin", null);
exports.BoardMembersController = BoardMembersController = __decorate([
    (0, swagger_1.ApiTags)('Board Members'),
    (0, common_1.Controller)('boards'),
    __metadata("design:paramtypes", [board_members_service_1.BoardMembersService])
], BoardMembersController);
//# sourceMappingURL=board-members.controller.js.map