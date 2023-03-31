import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MovesService } from './moves.service';
import { MoveDto } from './dto/move.dto';
import { UpdateMoveDto } from './dto/update-move.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindMoveDto } from './dto/find-move.dto';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { DateRangeDto } from 'src/shared/dto/date-range.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('moves')
@Controller('moves')
export class MovesController {
  constructor(private readonly movesService: MovesService) {}

  @Post('create')
  async create(@Body() moveDto: MoveDto) {
    return await this.movesService.create(moveDto);
  }

  @Get('findAll')
  async findAll() {
    return await this.movesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.movesService.findOne(id);
  }

  @Post('find')
  async find (@Body() findMoveDto: FindMoveDto) {
    return await this.movesService.find(findMoveDto);
  }

  @Post('findByPatient/:id')
  async findByPatient (@Param('id') id: string, @Body() dateRangeDto: DateRangeDto) {
    return await this.movesService.findByPatient(id, dateRangeDto);
  }

  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() updateMoveDto: UpdateMoveDto) {
    return await this.movesService.update(id, updateMoveDto);
  }

  @Delete('remove/:id')
  async remove(@Param('id') id: string) {
    return await this.movesService.remove(id);
  }
}
