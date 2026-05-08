import { BoardMembersService } from "./board-members.service";
import { BoardMemberDetailResponseDto } from "./dto/board-members/board-member-detail-response.dto";
import { CreateBoardMemberDto } from "./dto/board-members/create-board-member.dto";
import { UpdateBoardMemberDto } from "./dto/board-members/update-board-member.dto";
import { DeletionResponseDto } from "./dto/deletion-response.dto";
import { BoardMemberResponseDto } from "./dto/board-members/board-member-response.dto";
export declare class BoardMembersController {
    private readonly boardMembersService;
    constructor(boardMembersService: BoardMembersService);
    findById(req: any, boardId: string, userId: string): Promise<BoardMemberDetailResponseDto>;
    findByIdByAdmin(req: any, boardId: string, userId: string): Promise<BoardMemberDetailResponseDto>;
    create(req: any, createBoardMemberDto: CreateBoardMemberDto): Promise<BoardMemberResponseDto>;
    update(req: any, updateBoardMemberDto: UpdateBoardMemberDto): Promise<BoardMemberResponseDto>;
    updateByAdmin(req: any, updateBoardMemberDto: UpdateBoardMemberDto): Promise<BoardMemberResponseDto>;
    delete(req: any, boardId: string, userId: string): Promise<DeletionResponseDto>;
    deleteByAdmin(req: any, boardId: string, userId: string): Promise<DeletionResponseDto>;
}
