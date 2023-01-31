import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoutineDocument = Routine & Document;

@Schema()
export class Routine {

  @Prop({type: String, required: true})
  title: string;

  @Prop({type: String})
  description: string;

  @Prop({type: [String]})
  links: string[];
}

export const RoutineSchema = SchemaFactory.createForClass(Routine);