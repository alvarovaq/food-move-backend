import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { ConsultsService } from './consults.service';
import { ConsultDto } from './dto/consult.dto';
import { FilterConsultDto } from './dto/filter-consult.dto';
import { UpdateConsultDto } from './dto/update-consult.dto';
import { QueryConsultDto } from './dto/query-consult.dto';
import { DateRangeDto } from 'src/shared/dto/date-range.dto';

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
  async create(@Body() consultDto: ConsultDto) {
    return await this.consultsService.create(consultDto);
  }

  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() updateConsultDto: UpdateConsultDto) {
    return await this.consultsService.update(id, updateConsultDto);
  }

  @Delete('remove/:id')
  async remove(@Param('id') id: string) {
    return await this.consultsService.remove(id);
  }

  @Post('getValues/:id/:key')
  async getValues (@Param('id') id: string, @Param('key') key: string, @Body() dateRangeDto: DateRangeDto) {
    return await this.consultsService.getValues(id, key, dateRangeDto);
  } 
}
