import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindConsultDto } from 'src/consults/dto/find-consult.dto';
import { FindPatientDto } from './dto/find-patient.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('patients')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post('create')
  async create(@Body() createPatientDto: CreatePatientDto) {
    return await this.patientsService.create(createPatientDto);
  }

  @Get('findAll')
  async findAll() {
    return await this.patientsService.findAll();
  }

  @Get('findOne/:id')
  async findOne(@Param('id') id: string) {
    return await this.patientsService.findOne(id);
  }

  @Post('find')
  async find (@Body() findPatientDto: FindPatientDto) {
    return await this.patientsService.find(findPatientDto);
  }

  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return await this.patientsService.update(id, updatePatientDto);
  }

  @Delete('remove/:id')
  async remove(@Param('id') id: string) {
    return await this.patientsService.remove(id);
  }
}
