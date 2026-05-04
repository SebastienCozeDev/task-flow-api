import { Controller, Get, Param, UseGuards, Request } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { BoardMembersService } from "./board-members.service";
import { RolesGuard } from "src/auth/roles.guard";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "src/auth/roles.decorator";
import { BoardMemberDetailResponseDto } from "./dto/board-members/board-member-detail-response.dto";

@ApiTags('Boards')
@Controller('boards')
export class BoardMembersController {
    constructor(private readonly boardMembersService: BoardMembersService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get('me/:boardId/members/:userId')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Retrieve a specific board member by board and user ID' })
    async findById(@Request() req: any, @Param('boardId') boardId: string, @Param('userId') userId: string): Promise<BoardMemberDetailResponseDto> {
        return await this.boardMembersService.findByBoardAndUserIdsDetail(boardId, userId, req.user.userId);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @Get(':boardId/members/:userId')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Retrieve a specific board member by board and user ID with admin privilege' })
    async findByIdByAdmin(@Request() req: any, @Param('boardId') boardId: string, @Param('userId') userId: string): Promise<BoardMemberDetailResponseDto> {
        return await this.boardMembersService.findByBoardAndUserIdsDetail(boardId, userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me/:boardId')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Retrieve a specific board of the current user by ID' })
    async getMyBoardDetail(@Request() req: any, @Param('boardId') boardId: string) {
        return await this.boardMembersService.findBoardByIdWithDetail(boardId, req.user.userId);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @Get(':boardId')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Retrieve a specific board by ID with admin privilege' })
    async findBoardById(@Request() req: any, @Param('boardId') boardId: string) {
        return await this.boardMembersService.findBoardByIdWithDetail(boardId);
    }
}
