import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { FindRecipeDto } from './dto/find-recipe.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('recipes')
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post('create')
  async create(@Body() createRecipeDto: CreateRecipeDto) {
    return await this.recipesService.create(createRecipeDto);
  }

  @Get('findAll')
  async findAll() {
    return await this.recipesService.findAll();
  }

  @Get('findOne/:id')
  async findOne(@Param('id') id: string) {
    return await this.recipesService.findOne(id);
  }

  @Post('find')
  async find (@Body() findRecipeDto: FindRecipeDto) {
    return await this.recipesService.find(findRecipeDto);
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
