import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesGuard } from "src/auth/roles.guard";
import { TasksService } from "./tasks.service";
import { Task } from "./entities/task.entity";
import { TasksController } from "./tasks.controller";
import { UsersModule } from "src/users/users.module";
import { BoardsModule } from "src/boards/boards.module";

@Module({
    imports: [TypeOrmModule.forFeature([Task]), UsersModule, BoardsModule],
    controllers: [TasksController],
    providers: [TasksService, RolesGuard],
    exports: [],
})
export class TasksModule {}
