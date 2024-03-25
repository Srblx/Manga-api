import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { News, NewsDocument } from './news.schema';
import { Model, Types } from 'mongoose';
import { CreateNewsDto } from './dto/request/createNews.dto';
import { UpdateNewsDto } from './dto/request/updateNews.dto';

@Injectable()
export class NewsRepository {
  constructor(@InjectModel(News.name) private model: Model<NewsDocument>) {}

  private orThrow<T>(x: T | null | undefined): T {
    if (!x) throw new NotFoundException('NEWS_NOT_FOUND');
    return x;
  }

  find = () => this.model.find().sort({ createdAt: -1 }).populate('user').exec();

  findAll = (): Promise<NewsDocument[]> => this.model.find().sort({ createdAt: -1 }).populate('user').exec();

  findOneById = (id: string) => this.model.findOne({ _id: id }).populate('user').exec();

  findOneByIdOrThrow = (id: string) => this.findOneById(id).then(this.orThrow);

  createNews(createNewsDto: CreateNewsDto, userId: string | Types.ObjectId) {
    return this.model.create({
      user: userId,
      title: createNewsDto.title.toUpperCase(),
      content: createNewsDto.content,
      imageUrl: createNewsDto.imageUrl,
    });
  }

  deleteNews = (newsToDelete: NewsDocument) => this.model.deleteOne({ _id: newsToDelete._id }).exec();

  async updateNews(newsId: string, updateNewsDto: UpdateNewsDto): Promise<NewsDocument> {
    const updatedNews = await this.model.findByIdAndUpdate(newsId, updateNewsDto, { new: true }).exec();
    if (!updatedNews) throw new NotFoundException('NEWS_NOT_FOUND'); // normalement ce check plutot dans le service avant d'appeler le repository, mais dans ce cas, meme pas besoin car le newsByIdPipe du controller s'en charge
    return updatedNews;
  }
}
