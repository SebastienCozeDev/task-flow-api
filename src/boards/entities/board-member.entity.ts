import { User } from 'src/users/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from 'typeorm';


export enum BoardMemberRole {
    READER = 'reader',
    EDITOR = 'editor',
    MAINTENER = 'maintener',
    OWNER = 'owner',
}



@Entity()
@Unique('UQ_board_member_user_board', ['userId', 'boardId'])
export class Board {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'board_id' })
    boardId: string;

    @Column({ name: 'user_id' })
    userId: string;

    @Column({ name: 'invited_by_id' })
    invitedById: string;

    @Column({
        type: 'enum',
        enum: BoardMemberRole,
    })
    role: BoardMemberRole;

    @ManyToOne(() => Board, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'board_id' })
    board: Board;

    @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'invited_by_id' })
    invitedBy: User;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
