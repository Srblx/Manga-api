import { NewsMapper } from 'src/news/news.mapper';
import { GetLikesDto } from './dto/response/get-like.dto';
import { Likes, LikesDocument } from './likes.schema';
import { UsersMapper } from 'src/users/users.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LikesMapper {
  constructor(
    private readonly newsMapper: NewsMapper,
    private readonly usersMapper: UsersMapper,
  ) {}

  toGetLikesDto = (likes: LikesDocument[]): GetLikesDto[] => {
    return likes.map((likeArticle) => {
      return this.toGetLikeDto(likeArticle);
    });
  };

  toLikes = (likes: LikesDocument[]): Likes[] => {
    return likes.map((like) => {
      return {
        id: like._id,
        user: like.user,
        news: like.news,
      };
    });
  };

  toGetLikeDto = (likeArticle: LikesDocument): GetLikesDto => {
    return {
      id: likeArticle._id,
      user: this.usersMapper.toGetUserDto(likeArticle.user),
      news: this.newsMapper.toGetNewDto(likeArticle.news),
    };
  };
}
