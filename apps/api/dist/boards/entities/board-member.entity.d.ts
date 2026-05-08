import { User } from "../../users/entities/user.entity";
import { Board } from './board.entity';
export declare enum BoardMemberRole {
    READER = "reader",
    EDITOR = "editor",
    MAINTAINER = "maintainer",
    OWNER = "owner"
}
export declare class BoardMember {
    id: string;
    boardId: string;
    userId: string;
    invitedById: string;
    role: BoardMemberRole;
    board: Board;
    user: User;
    invitedBy: User;
    createdAt: Date;
    updatedAt: Date;
}
