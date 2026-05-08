import { Repository } from 'typeorm';
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from './entities/user.entity';
import { UserResponseDto } from "./dto/user-response.dto";
import { UpdateMeDto } from "./dto/update-me.dto";
import { FindUsersQueryDto } from "./dto/find-users-query.dto";
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    toResponseDto(user: User): UserResponseDto;
    checkPassword(user: User, password: string): Promise<boolean>;
    findAll(query: FindUsersQueryDto): Promise<UserResponseDto[]>;
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
    findMe(userId: string): Promise<UserResponseDto>;
    updateMe(userId: string, updateMeDto: UpdateMeDto): Promise<UserResponseDto>;
    create(createUserDto: CreateUserDto): Promise<UserResponseDto>;
}
