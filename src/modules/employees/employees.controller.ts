import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ValidationTypes } from 'class-validator';
import { FindEmployeeDto } from './dto/find-employee.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post('create')
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return await this.employeesService.create(createEmployeeDto);
  }

  @Get('findAll')
  async findAll() {
    return await this.employeesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.employeesService.findOne(id);
  }

  @Post('find')
  async find (@Body() findEmployeeDto: FindEmployeeDto) {
    return await this.employeesService.find(findEmployeeDto);
  }

  @Post('lookUp')
  async lookUp (@Body() FindEmployeeDto: FindEmployeeDto) {
    const employees = await this.employeesService.find(FindEmployeeDto);
    if (employees.length <= 0) throw new NotFoundException("No se ha encontrado ningún empleado");
    return employees[0];
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
