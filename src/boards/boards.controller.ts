import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags, ApiOperation } from "@nestjs/swagger";
import { AuthGuard } from '@nestjs/passport';
import { Roles } from "src/auth/roles.decorator";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardsService } from "./boards.service";

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
}
