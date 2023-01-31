import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindFoodDto } from './dto/find-food.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('foods')
@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  @Post('create')
  async create(@Body() createFoodDto: CreateFoodDto) {
    return await this.foodsService.create(createFoodDto);
  }

  @Get('findAll')
  async findAll() {
    return await this.foodsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.foodsService.findOne(id);
  }

  @Post('find')
  async find (@Body() findFoodDto: FindFoodDto) {
    return await this.foodsService.find(findFoodDto);
  }

  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto) {
    return await this.foodsService.update(id, updateFoodDto);
  }

  @Delete('remove/:id')
  async remove(@Param('id') id: string) {
    return await this.foodsService.remove(id);
  }
}
