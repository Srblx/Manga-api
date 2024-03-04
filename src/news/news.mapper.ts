import { UserDocument } from 'src/users/users.schema';
import { GetNewsDto } from './dto/response/get-news.dto';
import { News, NewsDocument } from './news.schema';
import { GetUserDto } from 'src/users/_utils/dto/response/get-user.dto';
import { UsersMapper } from 'src/users/users.mapper';
import { Types } from 'mongoose';
import { BadRequestException, HttpException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class NewsMapper {
  constructor(private readonly userMapper: UsersMapper) {}

  toGetNewsDto = (news: NewsDocument[] /* , user: UserDocument */): GetNewsDto[] =>
    news.map((newArticle) => {
      return this.toGetNewDto(newArticle);
    });

  toGetNewDto = (newArticle: NewsDocument): GetNewsDto => {
    // if (newArticle.user instanceof Types.ObjectId) throw new BadRequestException('ERROR_');
    return {
      id: newArticle._id,
      title: newArticle.title,
      content: newArticle.content,
      imageUrl: newArticle.imageUrl,
      user: this.userMapper.toGetUserDto(newArticle.user),
    };
  };
}
