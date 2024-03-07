import { UserDocument } from 'src/users/users.schema';
import { LikesRepository } from './likes.repository';
import { NewsDocument } from 'src/news/news.schema';
import { Injectable } from '@nestjs/common';
import { LikeNewsDto } from './dto/request/likes.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Likes } from './likes.schema';
import { Model } from 'mongoose';
import { LikesMapper } from './likes.mapper';
import { GetLikesDto } from './dto/response/get-like.dto';

@Injectable()
export class LikesService {
  constructor(
    @InjectModel(Likes.name) private likesModel: Model<Likes>,
    private readonly likesRepository: LikesRepository,
    private readonly likeMapper: LikesMapper,
  ) {}

  async createLikes(likesNewsDto: LikeNewsDto) {
    const createLike = await this.likesRepository.createLikes(likesNewsDto);
    return createLike;
  }

  async getLikes(): Promise<GetLikesDto[]> {
    const likes = await this.likesRepository.find();
    return this.likeMapper.toGetLikesDto(likes);
  }

  async deleteLikes(id: string): Promise<void> {
    await this.likesRepository.deleteLike(id);
  }
}
