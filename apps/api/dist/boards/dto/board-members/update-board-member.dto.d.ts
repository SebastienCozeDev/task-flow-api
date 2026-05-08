import { BoardMemberRole } from "../../entities/board-member.entity";
export declare class UpdateBoardMemberDto {
    boardId: string;
    userId: string;
    role: BoardMemberRole;
}
