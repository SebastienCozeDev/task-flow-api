import { ForbiddenException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { BoardMember, BoardMemberRole } from "./entities/board-member.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Board } from "./entities/board.entity";

@Injectable()
export class BoardRightsService {
    constructor(
        @InjectRepository(BoardMember)
        private readonly boardMembersRespository: Repository<BoardMember>,
    ) {}

    /**
     * Check if a specific user is member of a specific board.
     * @param board The specific board
     * @param userId The ID of the specific user
     * @returns The board member if the user is member a the board
     */
    async isMemberOfBoard(board: Board, userId: string): Promise<BoardMember> {
        const boardMember = await this.boardMembersRespository.findOneBy({ userId });
        if (!boardMember)
            throw new ForbiddenException("You are not a member of this board")
        return boardMember 
    }

    /**
     * Check if a specific user is owner of a specific board.
     * @param board The specific board
     * @param userId The ID of the specific user
     * @returns The board member if the user is owner a the board
     */
    async isOwnerOfBoard(board: Board, userId: string): Promise<BoardMember> {
        const boardMember = await this.boardMembersRespository.findOneBy({ userId });
        if (!boardMember)
            throw new ForbiddenException("The selected user or you are not a member of this board")
        return boardMember 
    }

    /**
     * Check if a specific user has the right to read the specific board. The admin's role is not considered.
     * @param board The specific board
     * @param userId The ID of the specific user
     * @returns The board member if the user has the good right
     */
    async hasRightToReadBoard(board: Board, userId: string): Promise<BoardMember> {
        return await this.isMemberOfBoard(board, userId);
    }

    /**
     * Check if a specific user has the right to update the specific board. The admin's role is not considered.
     * @param board The specific board
     * @param userId The ID of the specific user
     * @returns The board member if the user has the good right
     */
    async hasRightToUpdateBoard(board: Board, userId: string): Promise<BoardMember> {
        const boardMember = await this.isMemberOfBoard(board, userId);
        if (!(boardMember.role in [BoardMemberRole.MAINTENER, BoardMemberRole.OWNER]))
            throw new ForbiddenException("You are not maintener or owner of this board");
        return boardMember;
    }

    /**
     * Check if a specific user has the right to delete the specific board. The admin's role is not considered.
     * @param board The specific board
     * @param userId The ID of the specific user
     * @returns The board member if the user has the good right
     */
    async hasRightToDeleteBoard(board: Board, userId: string): Promise<BoardMember> {
        return await this.isOwnerOfBoard(board, userId);
    }

    /**
     * Check if a specific user has the right to invite a specific member in a specific board. The admin's role is not considered.
     * @param board The specific board
     * @param userId The ID of the specific user
     * @param invitedUserId The ID of the updated user
     * @returns The board member if the user has the good right
     */
    async hasRightToInviteMemberInBoard(board: Board, userId: string, invitedUserId: string): Promise<BoardMember> {
        const boardMember = await this.isMemberOfBoard(board, userId);
        const invitedMember = await this.isMemberOfBoard(board, invitedUserId);
        if (invitedMember)
            throw new ForbiddenException("The selected user is already invited")
        if (boardMember.role in [BoardMemberRole.OWNER, BoardMemberRole.MAINTENER])
            throw new ForbiddenException("You are not a owner or maintener of this board");
        return boardMember;
    }

    /**
     * Check if a specific user has the right to update the role of a specific member in a specific board. The admin's role is not considered.
     * @param board The specific board
     * @param userId The ID of the specific user
     * @param updatedUserId The ID of the updated user
     * @param role The new role for the updated user
     * @returns The board member and the updated member if the user has the good right
     */
    async hasRightToUpdateMemberRoleInBoard(board: Board, userId: string, updatedUserId: string, role: BoardMemberRole): Promise<BoardMember[]> {
        const boardMember = await this.isMemberOfBoard(board, userId);
        const updatedMember = await this.isMemberOfBoard(board, updatedUserId); 
        if (
            (boardMember.role != BoardMemberRole.OWNER || role === BoardMemberRole.OWNER)
            && (boardMember.role != BoardMemberRole.MAINTENER || role in [BoardMemberRole.OWNER, BoardMemberRole.MAINTENER])
        )
            throw new ForbiddenException("You are not a owner or maintener of this board or the seleted role is too high");
        return [boardMember, updatedMember];
    }

    /**
     * Check if a specific user has the right to kick a specific member in a specific board. The admin's role is not considered.
     * @param board The specific board
     * @param userId The ID of the specific user
     * @param kickedUserId The ID of the kicked user
     * @returns The board member and the kicked member if the user has the good right
     */
    async hasRightToKickMemberInBoard(board: Board, userId: string, kickedUserId: string): Promise<BoardMember[]> {
        const boardMember = await this.isMemberOfBoard(board, userId);
        const kickedMember = await this.isMemberOfBoard(board, kickedUserId); 
        if (boardMember.role != BoardMemberRole.OWNER && (kickedMember.invitedById != userId || boardMember.role != BoardMemberRole.MAINTENER))
            throw new ForbiddenException("You are not a owner of this board and you did not invite this member");
        return [boardMember, kickedMember];
    }
}
