import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersRepository } from './users.repository';
import { User, UserSchema } from './users.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserExistsRule } from './_utils/user-exist.rule';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/_utils/config';
import { UsersMapper } from './users.mapper';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<EnvironmentVariables, true>) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_SECRET') },
      }),
    }),
    forwardRef(() => JwtModule),
  ],
  providers: [UsersService, UsersRepository, UserExistsRule, UsersMapper],
  controllers: [UsersController],
  exports: [UsersService, UsersRepository, UsersMapper],
})
export class UsersModule {}
