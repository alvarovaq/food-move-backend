import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Recipe, RecipeSchema } from 'src/modules/recipes/schemas/recipe.schemas';
import { RecipeDocument } from '../../recipes/schemas/recipe.schemas';

export type WeeklyDietDocument = WeeklyDiet & Document;

@Schema()
export class WeeklyDiet {

  @Prop({type: String, required: true})
  title: string;

  @Prop({type: String})
  description: string;

  @Prop({type: [RecipeSchema]})
  monday: Recipe[];

  @Prop({type: [RecipeSchema]})
  tuesday: Recipe[];

  @Prop({type: [RecipeSchema]})
  wednesday: Recipe[];

  @Prop({type: [RecipeSchema]})
  thursday: Recipe[];

  @Prop({type: [RecipeSchema]})
  friday: Recipe[];

  @Prop({type: [RecipeSchema]})
  saturday: Recipe[];

  @Prop({type: [RecipeSchema]})
  sunday: Recipe[];
}

export const WeeklyDietSchema = SchemaFactory.createForClass(WeeklyDiet);