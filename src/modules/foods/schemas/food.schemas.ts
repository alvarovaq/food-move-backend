import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Meal } from 'src/shared/enums/meal';
import { Dish } from 'src/shared/enums/dish';
import { Rating } from '../../../shared/enums/rating';

export type FoodDocument = Food & Document;

@Schema()
export class Food {

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'patients', required: true})
  patient: mongoose.Schema.Types.ObjectId;

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

  @Prop({type: String})
  comments: string;

  @Prop({type: Date, required: true})
  date: Date;

  @Prop({type: Boolean, default: false})
  done: boolean;

  @Prop({
    type: [{name:{type: String, required: true}, quantity:{type: Number}, unit: {type: String}, isChecked: {type: Boolean, default: false}}]
  })
  ingredients: {name: string; quantity: number; unit: string, isChecked: boolean}[];

  @Prop({type: String, enum: Rating})
  rating: Rating;

}

export const FoodSchema = SchemaFactory.createForClass(Food);