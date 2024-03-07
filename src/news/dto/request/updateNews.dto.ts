import { IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateNewsDto {
  @IsOptional()
  _id: Types.ObjectId | string;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  imageUrl: string;
}
