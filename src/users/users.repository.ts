import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import { hashSync } from 'bcrypt';
import { CreateUserDto } from './_utils/dto/request/create-user.dto';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}

  private orThrow<T>(x: T | null | undefined): T {
    if (!x) throw new NotFoundException(`USER_NOT_FOUND`);
    return x;
  }

  findOneById = (id: string) => this.model.findOne({ _id: id }).exec();

  findOneByIdOrThrow = (id: string) => this.findOneById(id).then(this.orThrow);

  findOneByEmail = (email: string): Promise<UserDocument | null> =>
    this.model.findOne({ email: email.toLowerCase() }).exec();

  findOneByEmailOrThrow = (email: string) => this.findOneByEmail(email).then(this.orThrow);

  createUser(createUserDto: CreateUserDto) {
    const hashPassword = hashSync(createUserDto.password, 10);

    return this.model.create({
      email: createUserDto.email.toLowerCase(),
      firstname: createUserDto.firstname,
      lastname: createUserDto.lastname,
      password: hashPassword,
    });
  }

  deleteUser = (userToDelete: UserDocument) => this.model.deleteOne(userToDelete._id).exec();
}
