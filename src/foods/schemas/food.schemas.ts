import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Mean } from '../../recipes/enums/mean';
import { Dish } from 'src/recipes/enums/dish';

export type FoodDocument = Food & Document;

@Schema()
export class Food {

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'patients', required: true})
  patient: mongoose.Schema.Types.ObjectId;

  @Prop({type: String, required: true})
  title: string;

  @Prop({type: String})
  description: string;

  @Prop({type: String, enum: Mean, default: Mean.Comida})
  mean: Mean;

  @Prop({type: String, enum: Dish, default: Dish.Primero})
  dish: Dish;

  @Prop({type: [String]})
  links: string[];

  @Prop({type: String})
  comments: string;

  @Prop({type: Date, required: true})
  date: Date;

  @Prop({type: Boolean, default: false})
  done: boolean;

  @Prop({
    type: [{name:{type: String, required: true}, quantity:{type: Number}, unit: {type: String}}]
  })
  ingredients: {name: string; quantity: number; unit: string}[];

}

export const FoodSchema = SchemaFactory.createForClass(Food);