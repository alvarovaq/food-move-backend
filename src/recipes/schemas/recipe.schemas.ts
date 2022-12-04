import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { TypeFood } from '../enums/type-food.enums';
import { SubtypeFood } from '../enums/subtype-food.enum';

export type RecipeDocument = Recipe & Document;

@Schema()
export class Recipe {
  @Prop({type: String, required: true})
  title: string;

  @Prop({type: String})
  description: string;

  @Prop({type: String, enum: TypeFood, default: TypeFood.Comida})
  type: TypeFood;

  @Prop({type: String, enum: SubtypeFood, default: SubtypeFood.Primero})
  subtype: SubtypeFood;

  @Prop({type: [String]})
  links: string[];

  @Prop({
    type: [{name:{type: String, required: true}, quantity:{type: Number}, unit: {type: String}}]
  })
  ingredients: {name: string; quantity: number; unit: string}[];
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);