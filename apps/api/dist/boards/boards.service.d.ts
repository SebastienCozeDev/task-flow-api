import { Repository } from 'typeorm';
import { Board } from "./entities/board.entity";
import { CreateBoardDto } from "./dto/board/create-board.dto";
import { BoardResponseDto } from "./dto/board/board-response.dto";
import { UsersService } from "../users/users.service";
import { UpdateBoardDto } from "./dto/board/update-board.dto";
import { DeleteBoardDto } from "./dto/board/delete-board.dto";
import { DeletionResponseDto } from "./dto/deletion-response.dto";
import { User } from "../users/entities/user.entity";
import { BoardDetailResponseDto } from "./dto/board/board-detail-response.dto";
import { BoardMemberDetailResponseDto } from "./dto/board-members/board-member-detail-response.dto";
import { BoardRightsService } from "./board-rights.service";
export declare class BoardsService {
    private readonly boardsRepository;
    private readonly usersService;
    private readonly boardRightsService;
    constructor(boardsRepository: Repository<Board>, usersService: UsersService, boardRightsService: BoardRightsService);
    toResponseDto(board: Board): BoardResponseDto;
    toDetailResponseDto(board: Board, members: BoardMemberDetailResponseDto[]): BoardDetailResponseDto;
    findAll(): Promise<BoardResponseDto[]>;
    findById(id: string, options?: {
        relations?: string[];
    }): Promise<Board>;
    findByIdWithOwnerRelation(id: string, userId?: string): Promise<Board>;
    create(userId: string, createBoardDto: CreateBoardDto, numberOfBoard: number): Promise<BoardResponseDto>;
    updateByUser(userId: string, updateBoardDto: UpdateBoardDto): Promise<BoardResponseDto>;
    update(userId: string, updateBoardDto: UpdateBoardDto, user?: User, board?: Board): Promise<BoardResponseDto>;
    deleteByUser(userId: string, deleteBoardDto: DeleteBoardDto): Promise<DeletionResponseDto>;
    delete(userId: string, deleteBoardDto: DeleteBoardDto, user?: User, board?: Board): Promise<DeletionResponseDto>;
}
