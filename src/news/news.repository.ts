import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { News, NewsDocument } from "./news.schema";
import { Model, Types } from "mongoose";
import { CreateNewsDto } from "./dto/request/createNewus.dto";



@Injectable()
export class NewsRepository {
    constructor(@InjectModel(News.name) private model: Model<NewsDocument>) {}

    private orThrow<T>(x: T | null | undefined): T {
        if(!x) throw new NotFoundException('NEWS_NOT_FOUND');
        return x;
    }

    find = () => this.model.find().sort({createdAt: -1}).populate('user').exec();

    findOneById = (id: string) => this.model.find({ _id: id }).populate('user').exec();

    createNews(createNewsDto: CreateNewsDto, userId: string | Types.ObjectId){
        return this.model.create({
            user: userId,
            title: createNewsDto.title.toUpperCase(),
            content: createNewsDto.content,
            imageUrl: createNewsDto.imageUrl
        })
    }
}