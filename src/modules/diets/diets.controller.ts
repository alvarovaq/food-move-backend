import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DietsService } from './diets.service';
import { CreateDietDto } from './dto/create-diet.dto';
import { UpdateDietDto } from './dto/update-diet.dto';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FilterDietDto } from './dto/filter-diet.dto';
import { QueryDietDto } from './dto/query-diet.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('diets')
@Controller('diets')
export class DietsController {
  constructor(private readonly dietsService: DietsService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dietsService.findOne(id);
  }

  @Post('lookUp')
  async lookUp(@Body() filterDietDto: FilterDietDto) {
    return await this.dietsService.lookUp(filterDietDto);
  }

  @Post('filter')
  async filter(@Body() queryDietDto: QueryDietDto) {
    return await this.dietsService.filter(queryDietDto);
  }

  @Post('create')
  create(@Body() createDietDto: CreateDietDto) {
    return this.dietsService.create(createDietDto);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateDietDto: UpdateDietDto) {
    return this.dietsService.update(id, updateDietDto);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.dietsService.remove(id);
  }
}
