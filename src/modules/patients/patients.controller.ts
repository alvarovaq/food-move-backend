import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Request } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientDto } from './dto/patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { QueryPatientDto } from './dto/query-patient.dto';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { FilterPatientDto } from './dto/filter-patient.dto';
import { UseInterceptors } from '@nestjs/common/decorators';
import { Storage } from 'src/constants/uploads.constants';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('patients')
@Controller('patients')
export class PatientsController {
  constructor(
    private readonly patientsService: PatientsService
  ) {}

  @Post('lookUp')
  async lookUp(@Body() filterPatientDto: FilterPatientDto) {
    return await this.patientsService.lookUp(filterPatientDto);
  }

  @Post('filter')
  async filter(@Body() queryPatientDto: QueryPatientDto) {
    return await this.patientsService.filter(queryPatientDto);
  }

  @Post('create')
  async create(@Body() patientDto: PatientDto) {
    return await this.patientsService.create(patientDto);
  }

  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return await this.patientsService.update(id, updatePatientDto);
  }

  @Delete('remove/:id')
  async remove(@Param('id') id: string) {
    return await this.patientsService.remove(id);
  }

  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file', Storage))
  async upload (@Param('id') id: string, @UploadedFile(new ParseFilePipe({validators: [new MaxFileSizeValidator({maxSize: 10000000}), new FileTypeValidator({fileType: 'image/'})]})) file: Express.Multer.File) {
    return await this.patientsService.upload(id, file);
  }

  @Delete('remove-profile-image/:id')
  async removeProfileImage (@Param('id') id: string) {
    return await this.patientsService.removeProfileImage(id);
  } 

  @Get('randomPassword')
  async randomPassword () {
    return await this.patientsService.randomPassword();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.patientsService.findOne(id);
  }

}