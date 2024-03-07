import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { LikesRepository } from './likes.repository';
import { Likes, LikesSchema } from './likes.schema';
import { NewsModule } from 'src/news/news.module';
import { UsersModule } from 'src/users/users.module';
import { LikesMapper } from './likes.mapper';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Likes.name, schema: LikesSchema }]),
    UsersModule,
    forwardRef(() => NewsModule),
  ],
  controllers: [LikesController],
  providers: [LikesService, LikesRepository, LikesMapper],
  exports: [LikesService, LikesRepository],
})
export class LikesModule {}
