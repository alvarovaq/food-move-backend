import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type ConsultDocument = Consult & Document;

@Schema()
export class Consult {
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'patients', required: true})
  patient: mongoose.Schema.Types.ObjectId;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'employees'})
  employee: mongoose.Schema.Types.ObjectId;

  @Prop({type: Number})
  weight: number;

  @Prop({type: Number})
  pressure: number;

  @Prop({type: String})
  comments: string;

  @Prop({type: Date, default: Date.now(), required: true})
  created_at: Date;
}

export const ConsultSchema = SchemaFactory.createForClass(Consult);