import { HttpException, Injectable } from '@nestjs/common';
import { NewsRepository } from './news.repository';
import { GetNewsDto } from './dto/response/get-news.dto';
import { UsersMapper } from 'src/users/users.mapper';
import { NewsMapper } from './news.mapper';
import { News, NewsDocument } from './news.schema';
import { CreateNewsDto } from './dto/request/createNews.dto';
import { UserDocument } from 'src/users/users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateNewsDto } from './dto/request/updateNews.dto';
import { LikesRepository } from 'src/likes/likes.repository';
import { log } from 'console';
import { LikesDocument } from 'src/likes/likes.schema';

@Injectable()
export class NewsService {
  constructor(
    private readonly newsRepository: NewsRepository,
    private readonly newsMapper: NewsMapper,
    // @InjectModel(News.name) private newsModel: Model<News>,
    private readonly likesRepository: LikesRepository,
  ) {}

  async createNews(createNewsDto: CreateNewsDto, user: UserDocument): Promise<GetNewsDto> {
    const news = await this.newsRepository.find();
    if (!news) throw new HttpException('News not found', 404);
    const createdNews = await this.newsRepository.createNews(createNewsDto, user._id);
    return this.newsMapper.toGetNewDto(createdNews);
  }

  async getNews() {
    const news = await this.newsRepository.find();
    return this.newsMapper.toGetNewsDto(news);
  }

  getNewsById(id: string) {
    return this.newsRepository.findOneById(id);
  }

  async deleteNews(newsDocument: NewsDocument) {
    const likes = await this.likesRepository.findByNewsId(newsDocument._id);
    await this.newsRepository.deleteNews(newsDocument);
    if (likes && likes.length > 0) {
      for (const like of likes) {
        await this.likesRepository.deleteLike(like.id);
      }
    }
  }

  async updateNews(newsId: string, updateNewsDto: UpdateNewsDto): Promise<GetNewsDto> {
    const updatedNews = await this.newsRepository.updateNews(newsId, updateNewsDto);
    return this.newsMapper.toGetNewDto(updatedNews);
}
}
