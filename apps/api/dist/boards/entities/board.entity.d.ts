import { User } from "../../users/entities/user.entity";
export declare class Board {
    id: string;
    ownerId: string;
    title: string;
    description?: string;
    owner: User;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
