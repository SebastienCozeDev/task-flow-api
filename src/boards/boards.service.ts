import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from "./entities/board.entity";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardResponseDto } from "./dto/board-response.dto";
import { UsersService } from "src/users/users.service";
import { UpdateBoardDto } from "./dto/update-board.dto";


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

    async findById(id: string): Promise<Board> {
        const board = await this.boardsRepository.findOneBy({ id });
        if (!board)
            throw new NotFoundException("Board not found");
        return board;
    }

    async create(userId: string, createBoardDto: CreateBoardDto): Promise<BoardResponseDto> {
        const user = await this.usersService.findById(userId);
        if (user.maxBoard <= (await this.findByOwnerId(userId)).length)
            throw new ForbiddenException("You can't create more board");
        const board = this.boardsRepository.create({
            ...createBoardDto,
            ownerId: userId,
        });
        const savedBoard = await this.boardsRepository.save(board);
        return this.toResponseDto(savedBoard);
    }

    async update(userId: string, updateBoardDto: UpdateBoardDto): Promise<BoardResponseDto> {
        const user = await this.usersService.findById(userId);
        const board = await this.findById(updateBoardDto.id);
        if (user.id != board.ownerId)
            throw new ForbiddenException("You can only update your boards");
        if (updateBoardDto.ownerId && !updateBoardDto.password)
            throw new ForbiddenException("You can't transfert this board without password");
        if (updateBoardDto.password && !this.usersService.checkPassword(user, updateBoardDto.password))
            throw new ForbiddenException("Invalid password");
        if (updateBoardDto.ownerId)
            board.ownerId = updateBoardDto.ownerId;
        if (updateBoardDto.title)
            board.title = updateBoardDto.title;
        if (updateBoardDto.description)
            board.description = updateBoardDto.description;
        const updatedBoard = await this.boardsRepository.save(board);
        return this.toResponseDto(updatedBoard);
    }

    async updateByAdmin(userId: string, updateBoardDto: UpdateBoardDto): Promise<BoardResponseDto> {
        const user = await this.usersService.findById(userId);
        const board = await this.findById(updateBoardDto.id);
        if (updateBoardDto.ownerId && !updateBoardDto.password)
            throw new ForbiddenException("You can't transfert this board without password");
        if (updateBoardDto.password && !this.usersService.checkPassword(user, updateBoardDto.password))
            throw new ForbiddenException("Invalid password");
        if (updateBoardDto.ownerId)
            board.ownerId = updateBoardDto.ownerId;
        if (updateBoardDto.title)
            board.title = updateBoardDto.title;
        if (updateBoardDto.description)
            board.description = updateBoardDto.description;
        const updatedBoard = await this.boardsRepository.save(board);
        return this.toResponseDto(updatedBoard);
    }
}
