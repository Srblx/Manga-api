import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Likes, LikesDocument } from './likes.schema';
import { LikeNewsDto } from './dto/request/likes.dto';

@Injectable()
export class LikesRepository {
  constructor(@InjectModel(Likes.name) private model: Model<LikesDocument>) {}

  private orThrow<T>(x: T | null | undefined): T {
    if (!x) throw new NotFoundException('NEWS_NOT_FOUND');
    return x;
  }

  find = () => this.model.find().populate('user').populate('news').exec();

  createLikes(likesNewsDto: LikeNewsDto) {
    return this.model.create({
      user: likesNewsDto.user,
      news: likesNewsDto.news,
    });
  }

  deleteLike(id: string) {
    return this.model.findByIdAndDelete(id);
  }

  findByNewsId = (newsId: string) => this.model.find({ news: newsId }).exec();
}
