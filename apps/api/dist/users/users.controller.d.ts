import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateMeDto } from "./dto/update-me.dto";
import { FindUsersQueryDto } from "./dto/find-users-query.dto";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(query: FindUsersQueryDto): Promise<import("./dto/user-response.dto").UserResponseDto[]>;
    create(createUserDto: CreateUserDto): Promise<import("./dto/user-response.dto").UserResponseDto>;
    getMe(req: any): Promise<import("./dto/user-response.dto").UserResponseDto>;
    updateMe(req: any, updateMeDto: UpdateMeDto): Promise<import("./dto/user-response.dto").UserResponseDto>;
}
