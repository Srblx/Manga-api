import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from 'mongoose';
import { User, UserDocument } from "src/users/users.schema";

export type NewsDocument = News & Document;

@Schema({ versionKey: false, timestamps: true})
export class News {
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name})
    user: UserDocument;

    @Prop({ required : true})
    title: string;

    @Prop({ required: true})
    content: string;

    @Prop({ required: true })
    imageUrl: string;

    createdAt: Date;

    updatedAt: Date;

}

export const NewsSchema = SchemaFactory.createForClass(News);