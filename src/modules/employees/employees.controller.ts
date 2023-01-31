import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ValidationTypes } from 'class-validator';
import { FilterEmployeeDto } from './dto/filter-employee.dto';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { QueryEmployeeDto } from './dto/query-employee.dto';

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
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return await this.employeesService.create(createEmployeeDto);
  }
  
  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return await this.employeesService.update(id, updateEmployeeDto);
  }

  @Delete('remove/:id')
  async remove(@Param('id') id: string) {
    return await this.employeesService.remove(id);
  }
}
