import { ApiTags } from '@nestjs/swagger';
import { LikesService } from './likes.service';
import { BadRequestException, Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import mongoose from 'mongoose';
import { LikeNewsDto } from './dto/request/likes.dto';
import { Protect } from 'src/auth/_utils/decorator/protect.decorator';

@ApiTags('Likes')
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Protect()
  @Post()
  createLikes(@Body() userAndNewsId: LikeNewsDto) {
    return this.likesService.createLikes(userAndNewsId);
  }

  @Protect()
  @Get()
  getLikes() {
    return this.likesService.getLikes();
  }

  @Protect()
  @Delete(':id')
  async deleteLikes(@Param('id') id: string): Promise<string> {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new BadRequestException('Invalid ID');

    await this.likesService.deleteLikes(id);
    return 'Success';
  }
}
