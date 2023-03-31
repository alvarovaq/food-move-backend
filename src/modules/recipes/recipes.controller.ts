import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipeDto } from './dto/recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { FilterRecipeDto } from './dto/filter-recipe.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { QueryRecipeDto } from './dto/query-recipe.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('recipes')
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.recipesService.findOne(id);
  }

  @Post('lookUp')
  async lookUp(@Body() filterRecipeDto: FilterRecipeDto) {
    return await this.recipesService.lookUp(filterRecipeDto);
  }

  @Post('filter')
  async filter(@Body() queryRecipeDto: QueryRecipeDto) {
    return await this.recipesService.filter(queryRecipeDto);
  }

  @Post('create')
  async create(@Body() recipeDto: RecipeDto) {
    return await this.recipesService.create(recipeDto);
  }

  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return await this.recipesService.update(id, updateRecipeDto);
  }

  @Delete('remove/:id')
  async remove(@Param('id') id: string) {
    return await this.recipesService.remove(id);
  }
}
