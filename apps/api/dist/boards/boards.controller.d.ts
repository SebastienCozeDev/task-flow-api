import { CreateBoardDto } from "./dto/board/create-board.dto";
import { BoardsService } from "./boards.service";
import { UpdateBoardDto } from "./dto/board/update-board.dto";
import { DeleteBoardDto } from "./dto/board/delete-board.dto";
import { BoardMembersService } from "./board-members.service";
import { BoardResponseDto } from "./dto/board/board-response.dto";
import { BoardDetailResponseDto } from "./dto/board/board-detail-response.dto";
export declare class BoardsController {
    private readonly boardsService;
    private readonly boardMembersService;
    constructor(boardsService: BoardsService, boardMembersService: BoardMembersService);
    findAll(): Promise<BoardResponseDto[]>;
    getMe(req: any): Promise<BoardDetailResponseDto[]>;
    getMyBoardDetail(req: any, boardId: string): Promise<BoardDetailResponseDto>;
    findBoardById(req: any, boardId: string): Promise<BoardDetailResponseDto>;
    create(req: any, createBoardDto: CreateBoardDto): Promise<BoardResponseDto>;
    update(req: any, updateBoardDto: UpdateBoardDto): Promise<BoardResponseDto>;
    updateByAdmin(req: any, updateBoardDto: UpdateBoardDto): Promise<BoardResponseDto>;
    delete(req: any, deleteBoardDto: DeleteBoardDto): Promise<import("./dto/deletion-response.dto").DeletionResponseDto>;
    deleteByAdmin(req: any, deleteBoardDto: DeleteBoardDto): Promise<import("./dto/deletion-response.dto").DeletionResponseDto>;
}
