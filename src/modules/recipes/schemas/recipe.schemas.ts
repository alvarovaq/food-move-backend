import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Meal } from 'src/shared/enums/meal';
import { Dish } from 'src/shared/enums/dish';

export type RecipeDocument = Recipe & Document;

@Schema()
export class Recipe {
  @Prop({type: String, required: true})
  title: string;

  @Prop({type: String})
  description: string;

  @Prop({type: String, enum: Meal, default: Meal.Almuerzo})
  meal: Meal;

  @Prop({type: String, enum: Dish, default: Dish.Primero})
  dish: Dish;

  @Prop({type: [String]})
  links: string[];

  @Prop({
    type: [{name:{type: String, required: true}, quantity:{type: Number}, unit: {type: String}, isChecked:{type: Boolean, default: false}}]
  })
  ingredients: {name: string; quantity: number; unit: string, isChecked: boolean}[];

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'attachments'})
  attachment: mongoose.Schema.Types.ObjectId;

}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);