import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesGuard } from "src/auth/roles.guard";
import { TasksService } from "./tasks.service";

@Module({
    imports: [TypeOrmModule.forFeature([Board])],
    controllers: [],
    providers: [TasksService, RolesGuard],
    exports: [],
})
export class BoardsModule {}
