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
     * Check if a specific user is member of a specific board. The admin's role is not considered.
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
     * Check if a specific user has the right to read the specific board. The admin's role is not considered.
     * @param board The specific board
     * @param userId The ID of the specific user
     * @returns The board member if the user is member a the board
     */
    async hasRightToReadBoard(board: Board, userId: string) {
        return this.isMemberOfBoard(board, userId);
    }

    /**
     * Check if a specific user has the right to update the specific board. The admin's role is not considered.
     * @param board The specific board
     * @param userId The ID of the specific user
     * @returns The board member if the user is member a the board
     */
    async hasRightToUpdateBoard(board: Board, userId: string) {
        const boardMember = await this.hasRightToDeleteBoard(board, userId);
        if (boardMember.role != BoardMemberRole.MAINTENER)
            throw new ForbiddenException("You are not maintener of this board");
        return boardMember;
    }

    /**
     * Check if a specific user has the right to delete the specific board. The admin's role is not considered.
     * @param board The specific board
     * @param userId The ID of the specific user
     * @returns The board member if the user is member a the board
     */
    async hasRightToDeleteBoard(board: Board, userId: string) {
        const boardMember = await this.isMemberOfBoard(board, userId);
        if (boardMember.role != BoardMemberRole.OWNER)
            throw new ForbiddenException("You are not owner of this board");
        return boardMember;
    }
}
