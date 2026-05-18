import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class FindUsersQueryDto {
    @ApiPropertyOptional({
        enum: UserRole,
        example: UserRole.USER,
    })
    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;
}