import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesGuard } from "src/auth/roles.guard";
import { TasksService } from "./tasks.service";
import { Task } from "./entities/task.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Task])],
    controllers: [],
    providers: [TasksService, RolesGuard],
    exports: [],
})
export class TasksModule {}
