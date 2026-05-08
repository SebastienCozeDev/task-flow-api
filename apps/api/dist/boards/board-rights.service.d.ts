import { Repository } from "typeorm";
import { BoardMember, BoardMemberRole } from "./entities/board-member.entity";
import { Board } from "./entities/board.entity";
import { Task } from "../tasks/entities/task.entity";
export declare class BoardRightsService {
    private readonly boardMembersRespository;
    constructor(boardMembersRespository: Repository<BoardMember>);
    isMemberOfBoard(board: Board, userId: string): Promise<BoardMember>;
    isOwnerOfBoard(board: Board, userId: string): Promise<BoardMember>;
    isMaintainerOfBoard(board: Board, userId: string): Promise<BoardMember>;
    isEditorOfBoard(board: Board, userId: string): Promise<BoardMember>;
    hasRightToReadBoard(board: Board, userId: string): Promise<BoardMember>;
    hasRightToUpdateBoard(board: Board, userId: string): Promise<BoardMember>;
    hasRightToDeleteBoard(board: Board, userId: string): Promise<BoardMember>;
    hasRightToInviteMemberInBoard(board: Board, userId: string, invitedUserId: string): Promise<BoardMember>;
    hasRightToUpdateMemberRoleInBoard(board: Board, userId: string, updatedUserId: string, role: BoardMemberRole): Promise<BoardMember[]>;
    hasRightToKickMemberInBoard(board: Board, userId: string, kickedUserId: string): Promise<BoardMember[]>;
    hasRightToCreateTask(board: Board, userId: string): Promise<BoardMember>;
    hasRightToUpdateTask(board: Board, userId: string, task: Task): Promise<BoardMember>;
    hasRightToDeleteTask(board: Board, userId: string, task: Task): Promise<BoardMember>;
}
