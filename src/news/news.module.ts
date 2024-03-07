import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { News, NewsSchema } from './news.schema';
import { NewsService } from './news.service';
import { NewsRepository } from './news.repository';
import { NewsControler } from './news.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/_utils/config';
import { UsersModule } from 'src/users/users.module';
import { NewsMapper } from './news.mapper';
import { LikesModule } from 'src/likes/likes.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: News.name, schema: NewsSchema }]),
    forwardRef(() => UsersModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<EnvironmentVariables, true>) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_SECRET') },
      }),
    }),
    forwardRef(() => JwtModule),
    forwardRef(() => LikesModule),
  ],
  controllers: [NewsControler],
  providers: [NewsService, NewsRepository, NewsMapper],
  exports: [NewsService, NewsRepository, NewsMapper],
})
export class NewsModule {}
