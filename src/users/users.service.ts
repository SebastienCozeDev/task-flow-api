import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user..dto";

@Injectable()
export class UsersService {
    private users = [
        {
            id: 1,
            displayName: "John Doe",
            email: "john.doe@example.com"
        },
        {
            id: 2,
            displayName: "Jane Smith",
            email: "jane.smith@example.com"
        }
    ];

    findAll() {
        return this.users;
    }

    create(createUserDto: CreateUserDto) {
        const newUser = {
            id: this.users.length + 1,
            displayName: createUserDto.displayName,
            email: createUserDto.email,
        };
        this.users.push(newUser);
        return newUser;
    }
}