import { BoardMemberRole } from "../../entities/board-member.entity";
export declare class CreateBoardMemberDto {
    boardId: string;
    email: string;
    role: BoardMemberRole;
}
