import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';

export type PatientDocument = Patient & Document;

@Schema()
export class Patient {
  @Prop({type: String, required: true})
  name: string;

  @Prop({type: String})
  surname: string;

  @Prop({type: String, unique: true, required: true})
  email: string;

  @Prop({type: String})
  phone: string;

  @Prop({type: Date})
  birth: Date;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);