import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from "./dto/create-user..dto";
import { User } from './entities/user.entity';
import { UserResponseDto } from "./dto/user-response.dto";


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async findAll(): Promise<UserResponseDto[]> {
        const users = await this.usersRepository.find();
        return users.map(
            (user: User) =>
                new UserResponseDto({
                    id: user.id,
                    displayName: user.displayName,
                    email: user.email,
                })
        );
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
        return new UserResponseDto({
            id: savedUser.id,
            displayName: savedUser.displayName,
            email: savedUser.email,
        });
    }
}
