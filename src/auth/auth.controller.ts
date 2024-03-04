import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './_utils/dto/request/login.dto';
import { CreateUserDto } from 'src/users/_utils/dto/request/create-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Req() req: Request, @Body() body: CreateUserDto) {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Req() req: Request, @Body() body: LoginDto) {
    return this.authService.login(body);
  }
}
