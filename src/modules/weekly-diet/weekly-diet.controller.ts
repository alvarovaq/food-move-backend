import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WeeklyDietService } from './weekly-diet.service';
import { CreateWeeklyDietDto } from './dto/create-weekly-diet.dto';
import { UpdateWeeklyDietDto } from './dto/update-weekly-diet.dto';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FilterWeeklyDietDto } from './dto/filter-weekly-diet.dto';
import { QueryWeeklyDietDto } from './dto/query-weekly-diet.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('weekly-diet')
@Controller('weekly-diet')
export class WeeklyDietController {
  constructor(private readonly weeklyDietService: WeeklyDietService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weeklyDietService.findOne(id);
  }

  @Post('lookUp')
  async lookUp(@Body() filterRecipeDto: FilterWeeklyDietDto) {
    return await this.weeklyDietService.lookUp(filterRecipeDto);
  }

  @Post('filter')
  async filter(@Body() queryRecipeDto: QueryWeeklyDietDto) {
    return await this.weeklyDietService.filter(queryRecipeDto);
  }

  @Post('create')
  create(@Body() createWeeklyDietDto: CreateWeeklyDietDto) {
    return this.weeklyDietService.create(createWeeklyDietDto);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateWeeklyDietDto: UpdateWeeklyDietDto) {
    return this.weeklyDietService.update(+id, updateWeeklyDietDto);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.weeklyDietService.remove(+id);
  }
}
