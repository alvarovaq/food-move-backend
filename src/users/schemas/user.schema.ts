import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({type: String, unique: true, required: true})
  email: string;

  @Prop({type: String, required: true})
  password: string;

  @Prop({type: Boolean, default: false})
  isEmployee: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);