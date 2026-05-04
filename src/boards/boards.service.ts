import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from "./entities/board.entity";
import { CreateBoardDto } from "./dto/board/create-board.dto";
import { BoardResponseDto } from "./dto/board/board-response.dto";
import { UsersService } from "src/users/users.service";
import { UpdateBoardDto } from "./dto/board/update-board.dto";
import { DeleteBoardDto } from "./dto/board/delete-board.dto";
import { DeletionResponseDto } from "./dto/deletion-response.dto";
import { User } from "src/users/entities/user.entity";
import { BoardDetailResponseDto } from "./dto/board/board-detail-response.dto";
import { BoardMemberDetailResponseDto } from "./dto/board-members/board-member-detail-response.dto";
import { BoardRightsService } from "./board-rights.service";


@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(Board)
        private readonly boardsRepository: Repository<Board>,
        private readonly usersService: UsersService,
        private readonly boardRightsService: BoardRightsService,
    ) {}

    toResponseDto(board: Board): BoardResponseDto {
        return new BoardResponseDto({
            id: board.id,
            title: board.title,
            description: board.description,
            ownerId: board.ownerId,
        });
    }

    toDetailResponseDto(board: Board, members: BoardMemberDetailResponseDto[]): BoardDetailResponseDto {
        return new BoardDetailResponseDto({
            title: board.title,
            description: board.description,
            owner: this.usersService.toResponseDto(board.owner),
            members: members,
        });
    }

    async findAll(): Promise<BoardResponseDto[]> {
        const boards = await this.boardsRepository.find();
        return boards.map(
            (board: Board) => this.toResponseDto(board)
        )
    }

    async findById(id: string, options?: { relations?: string[] }): Promise<Board> {
        const board = await this.boardsRepository.findOne({
            where: { id },
            relations: options?.relations,
        });
        if (!board)
            throw new NotFoundException("Board not found");
        return board;
    }

    async findByIdWithOwnerRelation(id: string, userId?: string): Promise<Board> {
        const board = await this.boardsRepository.findOne({
            where: { id },
            relations: ['owner'],
        });
        if (!board)
            throw new NotFoundException("Board not found");
        if (userId)
            await this.boardRightsService.hasRightToReadBoard(board, userId)
        return board;
    }

    async create(userId: string, createBoardDto: CreateBoardDto, numberOfBoard: number): Promise<BoardResponseDto> {
        const user = await this.usersService.findById(userId);
        if (user.maxBoard <= numberOfBoard)
            throw new ForbiddenException(`You can't create more board (MAX: ${user.maxBoard}`);
        const board = this.boardsRepository.create({
            ...createBoardDto,
            ownerId: userId,
        });
        const savedBoard = await this.boardsRepository.save(board);
        return this.toResponseDto(savedBoard);
    }

    async updateByUser(userId: string, updateBoardDto: UpdateBoardDto): Promise<BoardResponseDto> {
        const user = await this.usersService.findById(userId);
        const board = await this.findById(updateBoardDto.id);
        await this.boardRightsService.hasRightToUpdateBoard(board, userId);
        return this.update(userId, updateBoardDto, user, board);
    }

    async update(userId: string, updateBoardDto: UpdateBoardDto, user?: User, board?: Board): Promise<BoardResponseDto> {
        if (!user)
            user = await this.usersService.findById(userId);
        if (!board)
            board = await this.findById(updateBoardDto.id);
        if (updateBoardDto.ownerId && !updateBoardDto.password)
            throw new ForbiddenException("You can't transfert this board without password");
        if (updateBoardDto.password && !this.usersService.checkPassword(user, updateBoardDto.password))
            throw new ForbiddenException("Invalid password");
        if (updateBoardDto.ownerId) // TODO: Remove ownerId everywhere to replace by role
            board.ownerId = updateBoardDto.ownerId;
        if (updateBoardDto.title)
            board.title = updateBoardDto.title;
        if (updateBoardDto.description)
            board.description = updateBoardDto.description;
        const updatedBoard = await this.boardsRepository.save(board);
        return this.toResponseDto(updatedBoard);
    }

    async deleteByUser(userId: string, deleteBoardDto: DeleteBoardDto): Promise<DeletionResponseDto> {
        const user = await this.usersService.findById(userId);
        const board = await this.findById(deleteBoardDto.id);
        await this.boardRightsService.hasRightToDeleteBoard(board, userId);
        return this.delete(userId, deleteBoardDto, user, board);
    }

    async delete(userId: string, deleteBoardDto: DeleteBoardDto, user?: User, board?: Board): Promise<DeletionResponseDto> {
        if (!user)
            user = await this.usersService.findById(userId);
        if (!board)
            board = await this.findById(deleteBoardDto.id);
        if (!this.usersService.checkPassword(user, deleteBoardDto.password))
            throw new ForbiddenException("Invalid password");
        if (!deleteBoardDto.permanently)
            await this.boardsRepository.softDelete(board.id);
        else
            await this.boardsRepository.delete(board.id);
        return new DeletionResponseDto({
            message: `"${board.title}" (ID: ${board.id}) has been successfully deleted ${deleteBoardDto.permanently ? 'with' : 'without'} permanently method`,
        });
    }
}
