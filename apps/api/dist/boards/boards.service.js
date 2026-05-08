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
exports.BoardsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const board_entity_1 = require("./entities/board.entity");
const board_response_dto_1 = require("./dto/board/board-response.dto");
const users_service_1 = require("../users/users.service");
const deletion_response_dto_1 = require("./dto/deletion-response.dto");
const board_detail_response_dto_1 = require("./dto/board/board-detail-response.dto");
const board_rights_service_1 = require("./board-rights.service");
let BoardsService = class BoardsService {
    boardsRepository;
    usersService;
    boardRightsService;
    constructor(boardsRepository, usersService, boardRightsService) {
        this.boardsRepository = boardsRepository;
        this.usersService = usersService;
        this.boardRightsService = boardRightsService;
    }
    toResponseDto(board) {
        return new board_response_dto_1.BoardResponseDto({
            id: board.id,
            title: board.title,
            description: board.description,
            ownerId: board.ownerId,
        });
    }
    toDetailResponseDto(board, members) {
        return new board_detail_response_dto_1.BoardDetailResponseDto({
            id: board.id,
            title: board.title,
            description: board.description,
            owner: this.usersService.toResponseDto(board.owner),
            members: members,
        });
    }
    async findAll() {
        const boards = await this.boardsRepository.find();
        return boards.map((board) => this.toResponseDto(board));
    }
    async findById(id, options) {
        const board = await this.boardsRepository.findOne({
            where: { id },
            relations: options?.relations,
        });
        if (!board)
            throw new common_1.NotFoundException("Board not found");
        return board;
    }
    async findByIdWithOwnerRelation(id, userId) {
        const board = await this.boardsRepository.findOne({
            where: { id },
            relations: ['owner'],
        });
        if (!board)
            throw new common_1.NotFoundException("Board not found");
        if (userId)
            await this.boardRightsService.hasRightToReadBoard(board, userId);
        return board;
    }
    async create(userId, createBoardDto, numberOfBoard) {
        const user = await this.usersService.findById(userId);
        if (user.maxBoard <= numberOfBoard)
            throw new common_1.ForbiddenException(`You can't create more board (MAX: ${user.maxBoard}`);
        const board = this.boardsRepository.create({
            ...createBoardDto,
            ownerId: userId,
        });
        const savedBoard = await this.boardsRepository.save(board);
        return this.toResponseDto(savedBoard);
    }
    async updateByUser(userId, updateBoardDto) {
        const user = await this.usersService.findById(userId);
        const board = await this.findById(updateBoardDto.id);
        await this.boardRightsService.hasRightToUpdateBoard(board, userId);
        return this.update(userId, updateBoardDto, user, board);
    }
    async update(userId, updateBoardDto, user, board) {
        if (!user)
            user = await this.usersService.findById(userId);
        if (!board)
            board = await this.findById(updateBoardDto.id);
        if (updateBoardDto.ownerId && !updateBoardDto.password)
            throw new common_1.ForbiddenException("You can't transfert this board without password");
        if (updateBoardDto.password && !this.usersService.checkPassword(user, updateBoardDto.password))
            throw new common_1.ForbiddenException("Invalid password");
        if (updateBoardDto.ownerId)
            throw new common_1.ForbiddenException("You can't transfert this board now (unimplemented feature)");
        if (updateBoardDto.title)
            board.title = updateBoardDto.title;
        if (updateBoardDto.description)
            board.description = updateBoardDto.description;
        const updatedBoard = await this.boardsRepository.save(board);
        return this.toResponseDto(updatedBoard);
    }
    async deleteByUser(userId, deleteBoardDto) {
        const user = await this.usersService.findById(userId);
        const board = await this.findById(deleteBoardDto.id);
        await this.boardRightsService.hasRightToDeleteBoard(board, userId);
        return this.delete(userId, deleteBoardDto, user, board);
    }
    async delete(userId, deleteBoardDto, user, board) {
        if (!user)
            user = await this.usersService.findById(userId);
        if (!board)
            board = await this.findById(deleteBoardDto.id);
        if (!this.usersService.checkPassword(user, deleteBoardDto.password))
            throw new common_1.ForbiddenException("Invalid password");
        if (!deleteBoardDto.permanently)
            await this.boardsRepository.softDelete(board.id);
        else
            await this.boardsRepository.delete(board.id);
        return new deletion_response_dto_1.DeletionResponseDto({
            message: `"${board.title}" (ID: ${board.id}) has been successfully deleted ${deleteBoardDto.permanently ? 'with' : 'without'} permanently method`,
        });
    }
};
exports.BoardsService = BoardsService;
exports.BoardsService = BoardsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(board_entity_1.Board)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        board_rights_service_1.BoardRightsService])
], BoardsService);
//# sourceMappingURL=boards.service.js.map