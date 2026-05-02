import { Body, Controller, Get, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags, ApiOperation } from "@nestjs/swagger";
import { AuthGuard } from '@nestjs/passport';
import { Roles } from "src/auth/roles.decorator";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardsService } from "./boards.service";
import { UpdateBoardDto } from "./dto/update-board.dto";

@ApiTags('Boards')
@Controller("boards")
export class BoardsController {
    constructor(private readonly boardsService: BoardsService) {}

    @UseGuards(AuthGuard('jwt'))
    @Roles('admin')
    @Get()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Retrieve all boards' })
    findAll() {
        return this.boardsService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Retrieve the boards of the current user' })
    getMe(@Request() req: any) {
        return this.boardsService.findByOwnerId(req.user.userId);
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
        return this.boardsService.update(req.user.userId, updateBoardDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Roles('admin')
    @Patch('force')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a board with admin privilege' })
    updateByAdmin(@Request() req: any, @Body() updateBoardDto: UpdateBoardDto) {
        return this.boardsService.updateByAdmin(req.user.userId, updateBoardDto);
    }
}
