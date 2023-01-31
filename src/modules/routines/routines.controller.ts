import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RoutinesService } from './routines.service';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindRoutineDto } from './dto/find-routine.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('routines')
@Controller('routines')
export class RoutinesController {
  constructor(private readonly routinesService: RoutinesService) {}

  @Post('create')
  async create(@Body() createRoutineDto: CreateRoutineDto) {
    return await this.routinesService.create(createRoutineDto);
  }

  @Get('findAll')
  async findAll() {
    return await this.routinesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.routinesService.findOne(id);
  }

  @Post('find')
  async find (@Body() findRoutineDto: FindRoutineDto) {
    return await this.routinesService.find(findRoutineDto);
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
