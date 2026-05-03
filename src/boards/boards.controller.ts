import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags, ApiOperation } from "@nestjs/swagger";
import { AuthGuard } from '@nestjs/passport';
import { Roles } from "src/auth/roles.decorator";
import { CreateBoardDto } from "./dto/board/create-board.dto";
import { BoardsService } from "./boards.service";
import { UpdateBoardDto } from "./dto/board/update-board.dto";
import { DeleteBoardDto } from "./dto/board/delete-board.dto";
import { RolesGuard } from "src/auth/roles.guard";

@ApiTags('Boards')
@Controller("boards")
export class BoardsController {
    constructor(private readonly boardsService: BoardsService) {}

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @Get()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Retrieve all boards with admin privilege' })
    findAll() {
        return this.boardsService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Retrieve the boards of the current user' })
    getMe(@Request() req: any) {
        return this.boardsService.findByOwnerId(req.user.userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me/:id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Retrieve a specific board of the current user by ID' })
    getMeDetail(@Request() req: any, @Param('id') id: string) {
        return this.boardsService.findByIdWithDetail(id, req.user.userId);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @Get(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Retrieve a specific board by ID with admin privilege' })
    findById(@Request() req: any, @Param('id') id: string) {
        return this.boardsService.findByIdWithDetail(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new board' })
    create(@Request() req: any, @Body() createBoardDto: CreateBoardDto) {
        return this.boardsService.create(req.user.userId, createBoardDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a board' })
    update(@Request() req: any, @Body() updateBoardDto: UpdateBoardDto) {
        return this.boardsService.updateByUser(req.user.userId, updateBoardDto);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @Patch('force')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a board with admin privilege' })
    updateByAdmin(@Request() req: any, @Body() updateBoardDto: UpdateBoardDto) {
        return this.boardsService.update(req.user.userId, updateBoardDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete a board' })
    delete(@Request() req: any, @Body() deleteBoardDto: DeleteBoardDto) {
        return this.boardsService.deleteByUser(req.user.userId, deleteBoardDto);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @Delete('force')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete a board with admin privilege' })
    deleteByAdmin(@Request() req: any, @Body() deleteBoardDto: DeleteBoardDto) {
        return this.boardsService.delete(req.user.userId, deleteBoardDto);
    }
}
