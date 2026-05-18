import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { TasksService } from "./tasks.service";
import { AuthGuard } from "@nestjs/passport";
import { TaskDetailResponseDto } from "./dto/task-detail-response.dto";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { DeletionResponseDto } from "src/boards/dto/deletion-response.dto";

@ApiTags('Tasks')
@Controller("tasks")
export class TasksController {
    constructor(
        private readonly tasksService: TasksService,
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Retrieve the tasks to which the current user is assigned' })
    async findAllByCurrentUser(@Request() req: any): Promise<TaskDetailResponseDto[]> {
        return await this.tasksService.findAllByAssignedToId(req.user.userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':boardId')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Retrieve the tasks of a specific board' })
    async findAllByBoardId(@Request() req: any, @Param('boardId') boardId: string): Promise<TaskDetailResponseDto[]> {
        return await this.tasksService.findAllByBoardId(boardId,req.user.userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new task' })
    async create(@Request() req: any, @Body() createTaskDto: CreateTaskDto): Promise<TaskDetailResponseDto> {
        return await this.tasksService.create(createTaskDto, req.user.userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a task' })
    async update(@Request() req: any, @Body() updateTaskDto: UpdateTaskDto): Promise<TaskDetailResponseDto> {
        return await this.tasksService.update(updateTaskDto, req.user.userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':taskId')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete a task' })
    async delete(@Request() req: any, @Param('taskId') taskId: string): Promise<DeletionResponseDto> {
        return await this.tasksService.delete(taskId, req.user.userId);
    }
}
