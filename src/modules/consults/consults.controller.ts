import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { ConsultsService } from './consults.service';
import { CreateConsultDto } from './dto/create-consult.dto';
import { FilterConsultDto } from './dto/filter-consult.dto';
import { UpdateConsultDto } from './dto/update-consult.dto';
import { QueryConsultDto } from './dto/query-consult.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('consults')
@Controller('consults')
export class ConsultsController {
  constructor(private readonly consultsService: ConsultsService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.consultsService.findOne(id);
  }

  @Post('lookUp')
  async lookUp(@Body() filterConsultDto: FilterConsultDto) {
    return await this.consultsService.lookUp(filterConsultDto);
  }

  @Post('filter')
  async filter(@Body() queryConsultDto: QueryConsultDto) {
    return await this.consultsService.filter(queryConsultDto);
  }

  @Post('create')
  async create(@Body() createConsultDto: CreateConsultDto) {
    return await this.consultsService.create(createConsultDto);
  }

  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() updateConsultDto: UpdateConsultDto) {
    return await this.consultsService.update(id, updateConsultDto);
  }

  @Delete('remove/:id')
  async remove(@Param('id') id: string) {
    return await this.consultsService.remove(id);
  }
}