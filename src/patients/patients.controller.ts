import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindPatientDto } from './dto/find-patient.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request, RequestHandler } from 'express';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('patients')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get('')
  async search(@Req() req: Request) {
    return await this.patientsService.search(req.query.s ? req.query.s.toString() : "", req.query.sort ? req.query.sort as string : "", parseInt(req.query.page as any), parseInt(req.query.limit as any));
  }

  @Get('findAll')
  async findAll() {
    return await this.patientsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.patientsService.findOne(id);
  }

  @Post('find')
  async find (@Body() findPatientDto: FindPatientDto) {
    return await this.patientsService.find(findPatientDto);
  }

  @Post('create')
  async create(@Body() createPatientDto: CreatePatientDto) {
    return await this.patientsService.create(createPatientDto);
  }

  @Patch('/update/:id')
  async update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return await this.patientsService.update(id, updatePatientDto);
  }

  @Delete('remove/:id')
  async remove(@Param('id') id: string) {
    return await this.patientsService.remove(id);
  }
}
