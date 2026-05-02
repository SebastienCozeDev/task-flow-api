import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from "./entities/board.entity";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardResponseDto } from "./dto/board-response.dto";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";


@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(Board)
        private readonly boardsRepository: Repository<Board>,
        private readonly usersService: UsersService,
    ) {}

    private toResponseDto(board: Board): BoardResponseDto {
        return new BoardResponseDto({
            title: board.title,
            description: board.description,
            owner: board.owner,
        });
    }

    async findAll(): Promise<BoardResponseDto[]> {
        const boards = await this.boardsRepository.find();
        return boards.map(
            (board: Board) => this.toResponseDto(board)
        )
    }

    async findByOwnerId(ownerId: string): Promise<BoardResponseDto[]> {
        const boards = await this.boardsRepository.find({
            where: { ownerId: ownerId },
        });
        return boards.map(
            (board: Board) => this.toResponseDto(board)
        );
    }

    async create(userId: string, createBoardDto: CreateBoardDto): Promise<BoardResponseDto> {
        const user = await this.usersService.findById(userId);
        if (!user)
            throw new NotFoundException("User not found");
        if (user.maxBoard <= (await this.findByOwnerId(userId)).length)
            throw new ForbiddenException("You can't create more board");
        const board = this.boardsRepository.create({
            ...createBoardDto,
            ownerId: userId,
        });
        const savedBoard = await this.boardsRepository.save(board);
        return this.toResponseDto(savedBoard);
    }
}