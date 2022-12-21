import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Mean } from '../enums/mean';
import { Dish } from '../enums/dish';

export type RecipeDocument = Recipe & Document;

@Schema()
export class Recipe {
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

  @Prop({
    type: [{name:{type: String, required: true}, quantity:{type: Number}, unit: {type: String}}]
  })
  ingredients: {name: string; quantity: number; unit: string}[];
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);