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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const task_entity_1 = require("./entities/task.entity");
const typeorm_2 = require("typeorm");
const task_detail_response_dto_1 = require("./dto/task-detail-response.dto");
const users_service_1 = require("../users/users.service");
const board_rights_service_1 = require("../boards/board-rights.service");
const boards_service_1 = require("../boards/boards.service");
const deletion_response_dto_1 = require("../boards/dto/deletion-response.dto");
let TasksService = class TasksService {
    tasksRepository;
    usersService;
    boardRightsService;
    boardsService;
    constructor(tasksRepository, usersService, boardRightsService, boardsService) {
        this.tasksRepository = tasksRepository;
        this.usersService = usersService;
        this.boardRightsService = boardRightsService;
        this.boardsService = boardsService;
    }
    toDetailResponseDto(task) {
        const dto = new task_detail_response_dto_1.TaskDetailResponseDto({
            description: task.description,
            imageLink: task.imageLink ?? undefined,
            moreLink: task.moreLink ?? undefined,
            dueDate: task.dueDate ?? undefined,
        });
        dto.id = task.id;
        dto.title = task.title;
        dto.state = task.state;
        dto.createdBy = task.createdBy ? this.usersService.toResponseDto(task.createdBy) : undefined;
        dto.lastUpdatedBy = task.lastUpdatedBy ? this.usersService.toResponseDto(task.lastUpdatedBy) : undefined;
        dto.assignedTo = task.assignedTo ? this.usersService.toResponseDto(task.assignedTo) : undefined;
        return dto;
    }
    async findAllEntitiesByAssignedToId(assignedToId) {
        return await this.tasksRepository.find({
            where: { assignedToId },
            relations: ['createdBy', 'lastUpdatedBy', 'assignedTo'],
        });
    }
    async findAllEntitiesByBoardId(boardId) {
        return await this.tasksRepository.find({
            where: { boardId },
            relations: ['createdBy', 'lastUpdatedBy', 'assignedTo'],
        });
    }
    async findEntityById(id) {
        const task = await this.tasksRepository.findOneBy({ id });
        if (!task)
            throw new common_1.NotFoundException("Task not found");
        return task;
    }
    async createEntity(createTaskDto, createdById) {
        const task = this.tasksRepository.create({
            ...createTaskDto,
            createdById: createdById,
            lastUpdatedById: createdById,
        });
        return await this.tasksRepository.save(task);
    }
    async updateEntity(updateTaskDto, updatedById) {
        const { id, ...data } = updateTaskDto;
        await this.tasksRepository.update(id, {
            ...data,
            lastUpdatedById: updatedById,
        });
        return await this.findEntityById(id);
    }
    async deleteEntity(id) {
        return await this.tasksRepository.delete(id);
    }
    async findAllByAssignedToId(assignedToId) {
        return (await this.findAllEntitiesByAssignedToId(assignedToId)).map((task => this.toDetailResponseDto(task)));
    }
    async findAllByBoardId(boardId, currentUserId) {
        await this.boardRightsService.isMemberOfBoard(await this.boardsService.findById(boardId), currentUserId);
        return (await this.findAllEntitiesByBoardId(boardId)).map((task => this.toDetailResponseDto(task)));
    }
    async create(createTaskDto, currentUserId) {
        const board = await this.boardsService.findById(createTaskDto.boardId);
        await this.boardRightsService.hasRightToCreateTask(board, currentUserId);
        return this.toDetailResponseDto(await this.createEntity(createTaskDto, currentUserId));
    }
    async update(updateTaskDto, currentUserId) {
        const task = await this.findEntityById(updateTaskDto.id);
        const board = await this.boardsService.findById(task.boardId);
        await this.boardRightsService.hasRightToUpdateTask(board, currentUserId, task);
        return this.toDetailResponseDto(await this.updateEntity(updateTaskDto, currentUserId));
    }
    async delete(id, currentUserId) {
        const task = await this.findEntityById(id);
        const board = await this.boardsService.findById(task.boardId);
        await this.boardRightsService.hasRightToDeleteTask(board, currentUserId, task);
        await this.deleteEntity(id);
        return new deletion_response_dto_1.DeletionResponseDto({
            message: `(ID:${id} has been successfully deleted)`,
        });
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        board_rights_service_1.BoardRightsService,
        boards_service_1.BoardsService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map