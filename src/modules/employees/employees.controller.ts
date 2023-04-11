import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeeDto } from './dto/employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ValidationTypes } from 'class-validator';
import { FilterEmployeeDto } from './dto/filter-employee.dto';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { QueryEmployeeDto } from './dto/query-employee.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Storage } from 'src/constants/uploads.constants';
import { MAX_SIZE_IMAGE } from '../../constants/uploads.constants';
import { ChangePasswordDto } from 'src/shared/dto/change-password.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.employeesService.findOne(id);
  }

  @Post('lookUp')
  async lookUp (@Body() filterEmployeeDto: FilterEmployeeDto) {
    return await this.employeesService.lookUp(filterEmployeeDto);
  }

  @Post('filter')
  async filter (@Body() queryEmployee: QueryEmployeeDto) {
    return await this.employeesService.filter(queryEmployee);
  }

  @Post('create')
  async create(@Body() employeeDto: EmployeeDto) {
    return await this.employeesService.create(employeeDto);
  }
  
  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return await this.employeesService.update(id, updateEmployeeDto);
  }

  @Delete('remove/:id')
  async remove(@Param('id') id: string) {
    return await this.employeesService.remove(id);
  }

  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file', Storage))
  async upload (@Param('id') id: string, @UploadedFile(new ParseFilePipe({validators: [new MaxFileSizeValidator({maxSize: MAX_SIZE_IMAGE}), new FileTypeValidator({fileType: 'image/*'})]})) file: Express.Multer.File) {
    return await this.employeesService.upload(id, file);
  }

  @Delete('remove-profile-image/:id')
  async removeProfileImage (@Param('id') id: string) {
    return await this.employeesService.removeProfileImage(id);
  } 

  @Post('change-password/:id')
  async changePassword (@Param('id') id: string, @Body() changePasswordDto: ChangePasswordDto) {
    this.employeesService.changePassword(id, changePasswordDto);
  }
  
}
