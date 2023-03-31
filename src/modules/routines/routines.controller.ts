import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RoutinesService } from './routines.service';
import { RoutineDto } from './dto/routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FilterRoutineDto } from './dto/filter-routine.dto';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { QueryRoutineDto } from './dto/query-routine.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('routines')
@Controller('routines')
export class RoutinesController {
  constructor(private readonly routinesService: RoutinesService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.routinesService.findOne(id);
  }

  @Post('lookUp')
  async lookUp(@Body() filterRoutineDto: FilterRoutineDto) {
    return await this.routinesService.lookUp(filterRoutineDto);
  }

  @Post('filter')
  async filter(@Body() queryRoutineDto: QueryRoutineDto) {
    return await this.routinesService.filter(queryRoutineDto);
  }

  @Post('create')
  async create(@Body() routineDto: RoutineDto) {
    return await this.routinesService.create(routineDto);
  }

  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() updateRoutineDto: UpdateRoutineDto) {
    return await this.routinesService.update(id, updateRoutineDto);
  }

  @Delete('remove/:id')
  async remove(@Param('id') id: string) {
    return await this.routinesService.remove(id);
  }
}
