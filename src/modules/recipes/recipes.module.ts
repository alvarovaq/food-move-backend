import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeSchema } from './schemas/recipe.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'recipes',
        schema: RecipeSchema
      }
    ])
  ],
  controllers: [RecipesController],
  providers: [RecipesService]
})
export class RecipesModule {}
