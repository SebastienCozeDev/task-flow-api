import { Body, Controller, Get, HttpCode, HttpStatus, Request, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';


@ApiTags('Auth')
@Controller('auth')
    export class AuthController {
        constructor(private readonly authService: AuthService) {}

        @Post('register')
        @ApiOperation({ summary: 'Register a new user account' })
        register(@Body() registerDto: RegisterDto) {
            return this.authService.register(registerDto);
        }

        @Post('login')
        @HttpCode(HttpStatus.OK)
        @ApiOperation({ summary: 'Login user and return access token' })
        login(@Body() loginDto: LoginDto) {
            return this.authService.login(loginDto.email, loginDto.password);
        }
}
