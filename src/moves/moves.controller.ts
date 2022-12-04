import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MovesService } from './moves.service';
import { CreateMoveDto } from './dto/create-move.dto';
import { UpdateMoveDto } from './dto/update-move.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindMoveDto } from './dto/find-move.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('moves')
@Controller('moves')
export class MovesController {
  constructor(private readonly movesService: MovesService) {}

  @Post('create')
  async create(@Body() createMoveDto: CreateMoveDto) {
    return await this.movesService.create(createMoveDto);
  }

  @Get('findAll')
  async findAll() {
    return await this.movesService.findAll();
  }

  @Get('findOne/:id')
  async findOne(@Param('id') id: string) {
    return await this.movesService.findOne(id);
  }

  @Post('find')
  async find (@Body() findMoveDto: FindMoveDto) {
    return await this.movesService.find(findMoveDto);
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
