import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { News, NewsDocument } from 'src/news/news.schema';
import { User, UserDocument } from 'src/users/users.schema';

export type LikesDocument = Likes & Document;

@Schema({ versionKey: false, timestamps: true })
export class Likes {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: UserDocument;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: News.name })
  news: NewsDocument;
}

export const LikesSchema = SchemaFactory.createForClass(Likes);
