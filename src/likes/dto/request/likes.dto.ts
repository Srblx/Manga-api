import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UserExists } from 'src/users/_utils/user-exist.rule';

export class LikeNewsDto {
  @ApiProperty()
  @UserExists()
  @IsString()
  user: string;

  @ApiProperty()
  @IsString()
  news: string;
}
