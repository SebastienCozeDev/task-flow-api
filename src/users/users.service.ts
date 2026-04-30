import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from "./dto/create-user..dto";
import { User } from './entities/user.entity';
import { UserResponseDto } from "./dto/user-response.dto";
import { UpdateMeDto } from "./dto/update-me.dto";
import { FindUsersQueryDto } from "./dto/find-users-query.dto";


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    private toResponseDto(user: User): UserResponseDto {
        return new UserResponseDto({
            id: user.id,
            displayName: user.displayName,
            email: user.email,
        });
    }

    async checkPassword(user: User, password: string) {
        return await bcrypt.compare(password, user.password);
    }

    async findAll(query: FindUsersQueryDto): Promise<UserResponseDto[]> {
        const users = await this.usersRepository.find({
            where: query.role ? { role: query.role } : {},
        });
        return users.map(
            (user: User) => this.toResponseDto(user)
        );
    }

    findByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOneBy({ email });
    }

    async findMe(userId: string): Promise<UserResponseDto> {
        const user = await this.usersRepository.findOneBy({ id: userId });
        if (!user)
            throw new NotFoundException("User not found");
        return this.toResponseDto(user);
    }

    async updateMe(userId: string, updateMeDto: UpdateMeDto): Promise<UserResponseDto> {
        const user = await this.usersRepository.findOneBy({ id: userId });
        if (!user)
            throw new NotFoundException("User not found");
        if (!this.checkPassword(user, updateMeDto.password))
            throw new UnauthorizedException("Authorized");
        if (updateMeDto.email && updateMeDto.email !== user.email) {
            const existingUser = await this.usersRepository.findOneBy({
                email: updateMeDto.email,
            });
            if (existingUser) {
                throw new ConflictException("Email already exists");
            }
            user.email = updateMeDto.email;
        }
        if (updateMeDto.displayName) {
            user.displayName = updateMeDto.displayName;
        }
        if (updateMeDto.newPassword) {
            user.password = updateMeDto.newPassword;
        }
        const updatedUser = await this.usersRepository.save(user);
        return this.toResponseDto(updatedUser);
    }

    async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
        const existingUser = await this.usersRepository.findOneBy({
            email: createUserDto.email,
        });
        if (existingUser)
            throw new ConflictException("Email already exists");
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10)
        const user = this.usersRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });
        const savedUser = await this.usersRepository.save(user);
        return this.toResponseDto(savedUser);
    }
}
