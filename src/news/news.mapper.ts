import { GetNewsDto } from './dto/response/get-news.dto';
import { NewsDocument } from './news.schema';
import { UsersMapper } from 'src/users/users.mapper';
import { Injectable } from '@nestjs/common';
import { log } from 'console';

@Injectable()
export class NewsMapper {
  constructor(private readonly userMapper: UsersMapper) {}

  toGetNewsDto = (news: NewsDocument[]): GetNewsDto[] => {
    return news.map((newArticle) => {
      return this.toGetNewDto(newArticle);
    });
  };

  toGetNewDto = (newArticle: NewsDocument): GetNewsDto => {
    return {
      id: newArticle._id,
      title: newArticle.title,
      content: newArticle.content,
      imageUrl: newArticle.imageUrl,
      createdAt: newArticle.createdAt,
      user: this.userMapper.toGetUserDto(newArticle.user),
    };
  };
}
