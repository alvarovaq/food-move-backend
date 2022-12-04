import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { receiveMessageOnPort } from 'worker_threads';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { FindRecipeDto } from './dto/find-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { RecipeDocument } from './schemas/recipe.schemas';

@Injectable()
export class RecipesService {

  constructor (@InjectModel('recipes') private readonly recipeModel: Model<RecipeDocument>) {}

  async create(createRecipeDto: CreateRecipeDto) {
    const recipe = await this.recipeModel.create(createRecipeDto);
    return recipe;
  }

  async findAll() {
    const recipes = await this.recipeModel.find({});
    return recipes;
  }

  async findOne(id: string) {
    const recipe = await this.recipeModel.findById(id);
    if (!recipe) throw new NotFoundException('No se ha encontrado la receta');
    return recipe;
  }

  async find (findRecipeDto: FindRecipeDto) {
    const recipes = await this.recipeModel.find(findRecipeDto);
    return recipes;
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
