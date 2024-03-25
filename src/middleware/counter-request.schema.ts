import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CounterRequestDocument = CounterRequest & Document;

@Schema({ versionKey: false, timestamps: true })
export class CounterRequest {
  @Prop() // @Prop({ type: String, required: true }) toujous spécifier des infos dans les @Prop
  pathName: string;

  @Prop({ type: Number, default: 1 })
  numberOfExecutions: number;

  @Prop({ type: [Date], default: [] })
  executions: Date[];

  @Prop()
  methodUsed: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const CounterRequestSchema = SchemaFactory.createForClass(CounterRequest);
