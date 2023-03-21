import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomQueryService } from 'src/services/custom-query.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { FilterRecipeDto } from './dto/filter-recipe.dto';
import { QueryRecipeDto } from './dto/query-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { RecipeDocument } from './schemas/recipe.schemas';

@Injectable()
export class RecipesService {

  constructor (
    @Inject(CustomQueryService) private readonly customQueryService: CustomQueryService,
    @InjectModel('recipes') private readonly recipeModel: Model<RecipeDocument>
  ) {}

  async findOne(id: string) {
    const recipe = await this.recipeModel.findById(id);
    if (!recipe) throw new NotFoundException('No se ha encontrado la receta');
    return recipe;
  }

  async lookUp (filter: FilterRecipeDto) {
    const recipe = await this.recipeModel.findOne(filter);
    if (!recipe) throw new NotFoundException('No se ha encontrado ningún resultado');
    return recipe;
  }

  async filter (queryRecipeDto: QueryRecipeDto) {
    return await this.customQueryService.filter(queryRecipeDto, this.recipeModel);
  }

  async create(createRecipeDto: CreateRecipeDto) {
    const recipe = await this.recipeModel.create(createRecipeDto);
    return recipe;
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto) {
    const updatedRecipe = await this.recipeModel.findByIdAndUpdate(id, updateRecipeDto, {new: true});
    if (!updatedRecipe) throw new NotFoundException('No se ha encontrado la receta');
    return updatedRecipe;
  }

  async remove(id: string) {
    const deletedRecipe = await this.recipeModel.findByIdAndDelete(id);
    if (!deletedRecipe) throw new NotFoundException('No se ha encontrado la receta');
    return deletedRecipe;
  }
}
