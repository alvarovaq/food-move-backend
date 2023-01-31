import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/modules/users/interfaces/user.interface';
import { UsersService } from 'src/modules/users/users.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { FindEmployeeDto } from './dto/find-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './interfaces/employee.interface';
import { EmployeeDocument } from './schema/employee.schema';

@Injectable()
export class EmployeesService {

  constructor (@Inject(UsersService) private readonly usersService: UsersService, @InjectModel('employees') private readonly employeeModel: Model<EmployeeDocument>) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const {email, password} = createEmployeeDto;
    const findEmployee = await this.employeeModel.findOne({email});
    if (findEmployee) throw new NotFoundException('Ya existe un empleado con ese email');
    const user = new User(email, password, true);
    await this.usersService.createUser(user);
    const employee = new Employee(createEmployeeDto);
    const createdEmployee = await this.employeeModel.create(employee);
    return createdEmployee;
  }

  async findAll() {
    const employees = await this.employeeModel.find({});
    return employees;
  }

  async findOne(id: string) {
    const employee = await this.employeeModel.findById(id);
    if (!employee) throw new NotFoundException('No se ha encontrado al empleado');
    return employee;
  }

  async find (findEmployeeDto: FindEmployeeDto) {
    const employees = await this.employeeModel.find(findEmployeeDto);
    return employees;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    if (Object.keys(updateEmployeeDto).indexOf('email') >= 0) {
      const prevEmployee = await this.findOne(id);
      if (prevEmployee.email != updateEmployeeDto.email) {
        const findUser = await this.usersService.findByEmail(updateEmployeeDto.email);
        if (findUser) throw new NotFoundException('Ya existe un usuario con ese email');
        await this.usersService.updateUserEmail(prevEmployee.email, updateEmployeeDto.email);
      }
    }
    const updatedEmployee = await this.employeeModel.findByIdAndUpdate(id, updateEmployeeDto, {new: true});
    if (!updatedEmployee) throw new NotFoundException('No se ha encontrado al empleado');
    return updatedEmployee;
  }

  async remove(id: string) {
    const deletedEmployee = await this.employeeModel.findByIdAndDelete(id);
    if (!deletedEmployee) throw new NotFoundException('No se ha encontrado al empleado');
    await this.usersService.removeUser(deletedEmployee.email);
    return deletedEmployee;
  }
}
