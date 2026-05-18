import { IsEmpty } from 'class-validator';
import { Board } from 'src/boards/entities/board.entity';
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


export enum TaskState {
    DRAFT = 'draft',
    TODO = 'todo',
    IN_PROGRESS = 'inProgress',
    DONE = 'done',
    ARCHIVED = 'archived',
}



@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 120 })
    title: string;

    @Column({ length: 255, nullable: true })
    description?: string;

    @Column({ name: 'board_id' })
    boardId: string;

    @Column({
        name: 'created_by_id',
        nullable: true,
    })
    createdById?: string;

    @Column({
        name: 'last_updated_by_id',
        nullable: true,
    })
    lastUpdatedById?: string;

    @Column({
        name: 'assigned_to_id',
        nullable: true,
    })
    assignedToId?: string;

    @Column({
        type: 'enum',
        enum: TaskState,
        default: TaskState.DRAFT,
    })
    state: TaskState;

    @Column({ length: 255, nullable: true })
    imageLink?: string;

    @Column({ length: 255, nullable: true })
    moreLink?: string;

    @Column({ type: 'date', nullable: true })
    dueDate?: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => Board, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'board_id' })
    board: Board;

    @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'created_by_id' })
    createdBy?: User | null;

    @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'last_updated_by_id' })
    lastUpdatedBy?: User | null;

    @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'assigned_to_id' })
    assignedTo?: User | null;
}
