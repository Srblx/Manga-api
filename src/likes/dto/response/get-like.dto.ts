import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { GetNewsDto } from 'src/news/dto/response/get-news.dto';
import { GetUserDto } from 'src/users/_utils/dto/response/get-user.dto';

export class GetLikesDto {
  @ApiProperty()
  id: string | Types.ObjectId;

  @ApiProperty()
  user: GetUserDto;

  @ApiProperty()
  news: GetNewsDto;
}
