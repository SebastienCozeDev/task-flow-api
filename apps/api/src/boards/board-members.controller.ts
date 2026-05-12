import { Controller, Get, Param, UseGuards, Request, Post, Body, Patch, Delete } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { BoardMembersService } from "./board-members.service";
import { RolesGuard } from "src/auth/roles.guard";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "src/auth/roles.decorator";
import { BoardMemberDetailResponseDto } from "./dto/board-members/board-member-detail-response.dto";
import { CreateBoardMemberDto } from "./dto/board-members/create-board-member.dto";
import { UpdateBoardMemberDto } from "./dto/board-members/update-board-member.dto";
import { DeletionResponseDto } from "./dto/deletion-response.dto";
import { BoardMemberResponseDto } from "./dto/board-members/board-member-response.dto";

@ApiTags('Board Members')
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
    @Post('members')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Invite a member in a specific board' })
    create(@Request() req: any, @Body() createBoardMemberDto: CreateBoardMemberDto): Promise<BoardMemberResponseDto> {
        return this.boardMembersService.create(createBoardMemberDto, req.user.userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('members')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update the role of a specific user in a specific board' })
    update(@Request() req: any, @Body() updateBoardMemberDto: UpdateBoardMemberDto): Promise<BoardMemberResponseDto> {
        return this.boardMembersService.update(updateBoardMemberDto, req.user.userId);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @Patch('members/force')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update the role of a specific member in a specific board with admin privilege' })
    updateByAdmin(@Request() req: any, @Body() updateBoardMemberDto: UpdateBoardMemberDto): Promise<BoardMemberResponseDto> {
        return this.boardMembersService.update(updateBoardMemberDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':boardId/members/:userId')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete a specifc member of a specific board' })
    delete(@Request() req: any, @Param('boardId') boardId: string, @Param('userId') userId: string): Promise<DeletionResponseDto> {
        return this.boardMembersService.delete(boardId, userId, req.user.userId);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @Delete('force')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete a specifc member of a specific board with admin privilege' })
    deleteByAdmin(@Request() req: any, @Param('boardId') boardId: string, @Param('userId') userId: string): Promise<DeletionResponseDto> {
        return this.boardMembersService.delete(boardId, userId);
    }
}
