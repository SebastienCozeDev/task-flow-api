import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesGuard } from "src/auth/roles.guard";
import { Board } from "./entities/board.entity";
import { UsersModule } from "src/users/users.module";
import { BoardsService } from "./boards.service";
import { BoardsController } from "./boards.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Board]), UsersModule],
    controllers: [BoardsController],
    providers: [BoardsService, RolesGuard],
    exports: [],
})
export class BoardsModule {}
