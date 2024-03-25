import { HttpException, Injectable } from '@nestjs/common';
import { LikesRepository } from 'src/likes/likes.repository';
import { UserDocument } from 'src/users/users.schema';
import { CreateNewsDto } from './dto/request/createNews.dto';
import { UpdateNewsDto } from './dto/request/updateNews.dto';
import { GetNewsDto } from './dto/response/get-news.dto';
import { NewsMapper } from './news.mapper';
import { NewsRepository } from './news.repository';
import { NewsDocument } from './news.schema';

@Injectable()
export class NewsService {
  constructor(
    private readonly newsRepository: NewsRepository,
    private readonly newsMapper: NewsMapper,
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
    if (likes && likes.length > 0) { // utiliser un Promise.all pour question de performance (toutes les requetes sont executées en parallele)
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
