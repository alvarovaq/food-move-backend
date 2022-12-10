import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ConsultsService } from './consults.service';
import { CreateConsultDto } from './dto/create-consult.dto';
import { FindConsultDto } from './dto/find-consult.dto';
import { UpdateConsultDto } from './dto/update-consult.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('consults')
@Controller('consults')
export class ConsultsController {
  constructor(private readonly consultsService: ConsultsService) {}

  @Post('create')
  async create(@Body() createConsultDto: CreateConsultDto) {
    return await this.consultsService.create(createConsultDto);
  }

  @Get('findAll')
  async findAll() {
    return await this.consultsService.findAll();
  }

  @Get('findOne/:id')
  async findOne(@Param('id') id: string) {
    return await this.consultsService.findOne(id);
  }

  @Post('find')
  async find (@Body() findConsultDto: FindConsultDto) {
    return await this.consultsService.find(findConsultDto);
  }

  @Post('findByPatient/:id')
  async findByPatient (@Param('id') id: string) {
    return await this.consultsService.findByPatient(id);
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
