import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

import { UserDocument } from './users.schema';
import { UsersMapper } from './users.mapper';
import { GetUserDto } from './_utils/dto/response/get-user.dto';
import { CreateUserDto } from './_utils/dto/request/create-user.dto';
import { GetMeDto } from './_utils/dto/response/get-me.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository, private readonly usersMapper: UsersMapper) {}

  async createUser(createUserDto: CreateUserDto): Promise<GetUserDto> {
    const user = await this.usersRepository.findOneByEmail(createUserDto.email);
    if (user) throw new BadRequestException('EMAIL_ALREADY_EXISTS');

    const createdUser = await this.usersRepository.createUser(createUserDto);

    return this.usersMapper.toGetUserDto(createdUser);
  }

  getCurrentUser(user: UserDocument): GetMeDto {
    return this.usersMapper.toGetMeDto(user);
  }

  getUser(user: UserDocument): GetUserDto {
    return this.usersMapper.toGetUserDto(user);
  }

  deleteUser = async (user: UserDocument) => {
    return this.usersRepository.deleteUser(user);
  };
}
