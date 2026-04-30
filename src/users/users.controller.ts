import { Body, Controller, Get, Post, Patch, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags, ApiOperation } from "@nestjs/swagger";
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user..dto";
import { UpdateMeDto } from "./dto/update-me.dto";
import { RolesGuard } from "src/auth/roles.guard";
import { Roles } from "src/auth/roles.decorator";

@ApiTags('Users')
@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @Get()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Retrieve all users' })
    findAll() {
        return this.usersService.findAll();
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @Post()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new user' })
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Retrieve the current user' })
    getMe(@Request() req: any) {
        return this.usersService.findMe(req.user.userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('me')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update the current user' })
    updateMe(@Request() req: any, @Body() updateMeDto: UpdateMeDto) {
        return this.usersService.updateMe(req.user.userId, updateMeDto);
    }
}
