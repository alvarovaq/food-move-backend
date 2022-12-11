import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type MoveDocument = Move & Document;

@Schema()
export class Move {
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'patients', required: true})
  patient: mongoose.Schema.Types.ObjectId;

  @Prop({type: String, required: true})
  title: string;

  @Prop({type: String})
  description: string;

  @Prop({type: [String]})
  links: string[];

  @Prop({type: String})
  comments: string;

  @Prop({type: Date, required: true})
  date: Date;

  @Prop({type: Boolean, default: false})
  done: boolean;
}

export const MoveSchema = SchemaFactory.createForClass(Move);