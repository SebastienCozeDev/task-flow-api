"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const user_entity_1 = require("./entities/user.entity");
const user_response_dto_1 = require("./dto/user-response.dto");
let UsersService = class UsersService {
    usersRepository;
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    toResponseDto(user) {
        return new user_response_dto_1.UserResponseDto({
            id: user.id,
            displayName: user.displayName,
            email: user.email,
        });
    }
    async checkPassword(user, password) {
        return await bcrypt.compare(password, user.password);
    }
    async findAll(query) {
        const users = await this.usersRepository.find({
            where: query.role ? { role: query.role } : {},
        });
        return users.map((user) => this.toResponseDto(user));
    }
    async findByEmail(email) {
        const user = await this.usersRepository.findOneBy({ email });
        if (!user)
            throw new common_1.NotFoundException("User not found");
        return user;
    }
    async findById(id) {
        const user = await this.usersRepository.findOneBy({ id });
        if (!user)
            throw new common_1.NotFoundException("User not found");
        return user;
    }
    async findMe(userId) {
        const user = await this.usersRepository.findOneBy({ id: userId });
        if (!user)
            throw new common_1.NotFoundException("User not found");
        return this.toResponseDto(user);
    }
    async updateMe(userId, updateMeDto) {
        const user = await this.findById(userId);
        if (!this.checkPassword(user, updateMeDto.password))
            throw new common_1.UnauthorizedException("Invalid password");
        if (updateMeDto.email && updateMeDto.email !== user.email) {
            const existingUser = await this.usersRepository.findOneBy({
                email: updateMeDto.email,
            });
            if (existingUser) {
                throw new common_1.ConflictException("Email already exists");
            }
            user.email = updateMeDto.email;
        }
        if (updateMeDto.displayName) {
            user.displayName = updateMeDto.displayName;
        }
        if (updateMeDto.newPassword) {
            user.password = await bcrypt.hash(updateMeDto.newPassword, 10);
        }
        const updatedUser = await this.usersRepository.save(user);
        return this.toResponseDto(updatedUser);
    }
    async create(createUserDto) {
        const existingUser = await this.usersRepository.findOneBy({
            email: createUserDto.email,
        });
        if (existingUser)
            throw new common_1.ConflictException("Email already exists");
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = this.usersRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });
        const savedUser = await this.usersRepository.save(user);
        return this.toResponseDto(savedUser);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map