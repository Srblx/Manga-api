import { GetUserDto } from './_utils/dto/response/get-user.dto';
import { UserDocument } from './users.schema';
import { GetMeDto } from './_utils/dto/response/get-me.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersMapper {
toGetUserDto = (user: UserDocument): GetUserDto => ({
    id: user._id,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    role: user.role,
  });

toGetMeDto = (user: UserDocument): GetMeDto => ({
    id: user._id,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    role: user.role,
  });
}
