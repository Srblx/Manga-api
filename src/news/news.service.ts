import { HttpException, Injectable } from "@nestjs/common";
import { NewsRepository } from "./news.repository";
import { GetNewsDto } from "./dto/response/get-news.dto";
import { UsersMapper } from "src/users/users.mapper";
import { NewsMapper } from "./news.mapper";
import { NewsDocument } from "./news.schema";
import { CreateNewsDto } from "./dto/request/createNewus.dto";
import { UserDocument } from "src/users/users.schema";


@Injectable()
export class NewsService {
    constructor(private readonly newsRepository: NewsRepository, private readonly newsMapper: NewsMapper){}

    async createNews(createNewsDto: CreateNewsDto, user: UserDocument): Promise<GetNewsDto>{
        const news = await this.newsRepository.find()
        if(!news) throw new HttpException('News not found', 404)
        const createdNews = await this.newsRepository.createNews(createNewsDto, user._id);
        return this.newsMapper.toGetNewDto(createdNews);
    }

    getNews(){
        return this.newsRepository.find()
    }

}