import { BadRequestException, Injectable, NotFoundException, PipeTransform } from "@nestjs/common";
import { NewsRepository } from "../news.repository";
import { isValidObjectId } from "mongoose";
import { NewsDocument } from "../news.schema";

@Injectable()
export class NewsByIdPipe implements PipeTransform {
  constructor(private newsRepository: NewsRepository) {}

  async transform(newsId: string): Promise<NewsDocument> {
    if (!isValidObjectId(newsId)) throw new BadRequestException('INVALID_NEWS_ID');
    return this.newsRepository.findOneByIdOrThrow(newsId);
  }
}