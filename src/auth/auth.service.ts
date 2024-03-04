import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { LoginDto } from './_utils/dto/request/login.dto';

import { UsersRepository } from 'src/users/users.repository';
import { UserDocument } from 'src/users/users.schema';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/_utils/dto/request/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<UserDocument> {
    const user = await this.usersRepository.findOneByEmail(email);
    if (user && compareSync(pass, user.password)) return user;
    throw new UnauthorizedException('WRONG_CREDENTIALS');
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.findOneByEmail(createUserDto.email);
    if (user) throw new BadRequestException('EMAIL_ALREADY_EXISTS');

    return this.usersService.createUser(createUserDto);
  }

  async login(login: LoginDto) {
    const user = await this.validateUser(login.email, login.password);

    const payload = { email: user.email, id: user._id, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
      user: await this.usersService.getCurrentUser(user),
    };
  }
}
