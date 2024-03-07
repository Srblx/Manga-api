import { BadRequestException, Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { Protect } from 'src/auth/_utils/decorator/protect.decorator';
import { GetNewsDto } from './dto/response/get-news.dto';
import { NewsDocument } from './news.schema';
import { CreateNewsDto } from './dto/request/createNews.dto';
import { UserRoleEnum } from 'src/users/_utils/user-role.enum';
import { ConnectedUser } from 'src/auth/_utils/decorator/connected-user.decorator';
import { UserDocument } from 'src/users/users.schema';
import mongoose from 'mongoose';
import { NewsByIdPipe } from './dto/news-by-id.pipe';
import { UpdateNewsDto } from './dto/request/updateNews.dto';

@ApiTags('News')
@Controller('news')
export class NewsControler {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @ApiOperation({
    summary: 'Recupère les information de la news.',
  })
  @ApiOkResponse({ description: 'SUCCES', type: GetNewsDto })
  getNews() {
    return this.newsService.getNews();
  }

  @Get(':id')
  async getNewsById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('News not found', 404);
    return await this.newsService.getNewsById(id);
  }

  @Protect(UserRoleEnum.ADMIN)
  @Post()
  createNews(@Body() createNewsDto: CreateNewsDto, @ConnectedUser() user: UserDocument) {
    return this.newsService.createNews(createNewsDto, user);
  }

  @Protect(UserRoleEnum.ADMIN)
  @Delete(':newsId')
  @Protect(UserRoleEnum.ADMIN)
  async deleteNews(@Param('newsId', NewsByIdPipe) newsToDelete: NewsDocument) {
    await this.newsService.deleteNews(newsToDelete);
  }

  @Patch(':newsId')
  @Protect()
  async updateNews(@Param('newsId', NewsByIdPipe) newsToUpdate: NewsDocument, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.updateNews(newsToUpdate._id, updateNewsDto);
  }
}
