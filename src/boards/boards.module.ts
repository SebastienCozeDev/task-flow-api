import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesGuard } from "src/auth/roles.guard";
import { Board } from "./entities/board.entity";
import { UsersModule } from "src/users/users.module";
import { BoardsService } from "./boards.service";
import { BoardsController } from "./boards.controller";
import { BoardMembersController } from "./board-members.controller";
import { BoardMembersService } from "./board-members.service";
import { BoardMember } from "./entities/board-member.entity";
import { BoardRightsService } from "./board-rights.service";

@Module({
    imports: [TypeOrmModule.forFeature([Board]), TypeOrmModule.forFeature([BoardMember]), UsersModule],
    controllers: [BoardsController, BoardMembersController],
    providers: [BoardsService, BoardMembersService, BoardRightsService, RolesGuard],
    exports: [BoardsService, BoardMembersService, BoardRightsService],
})
export class BoardsModule {}
