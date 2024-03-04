import { Body, Controller, Delete, Get, HttpException, Param, Post } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { NewsService } from "./news.service";
import { Protect } from "src/auth/_utils/decorator/protect.decorator";
import { GetNewsDto } from "./dto/response/get-news.dto";
import { NewsDocument } from "./news.schema";
import { CreateNewsDto } from "./dto/request/createNewus.dto";
import { UserRoleEnum } from "src/users/_utils/user-role.enum";
import { ConnectedUser } from "src/auth/_utils/decorator/connected-user.decorator";
import { UserDocument } from "src/users/users.schema";
import { log } from "console";
import mongoose from "mongoose";



@ApiTags('News')
@Controller('news')
export class NewsControler {
    constructor(private readonly newsService: NewsService){}

    @Get()
    @ApiOperation({
        summary: "Recupère les information de la news."
    })
    @ApiOkResponse({ description: 'SUCCES', type: GetNewsDto })
    getNews(/* news: NewsDocument */){
        return this.newsService.getNews(/* news */)
    }

    @Protect(UserRoleEnum.ADMIN)
    @Post()
    createNews(@Body() createNewsDto: CreateNewsDto, @ConnectedUser()user: UserDocument){
        return this.newsService.createNews(createNewsDto, user);
    }


}