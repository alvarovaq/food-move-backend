import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Meal } from 'src/shared/enums/meal';
import { Dish } from 'src/shared/enums/dish';
import { Rating } from '../../../shared/enums/rating';
import { Recipe } from 'src/modules/recipes/schemas/recipe.schemas';

export type FoodDocument = Food & Document;

@Schema()
export class Food extends Recipe {

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'patients', required: true})
  patient: mongoose.Schema.Types.ObjectId;

  @Prop({type: String})
  comments: string;

  @Prop({type: Date, required: true})
  date: Date;

  @Prop({type: Boolean, default: false})
  done: boolean;

  @Prop({type: String, enum: Rating})
  rating: Rating;

}

export const FoodSchema = SchemaFactory.createForClass(Food);