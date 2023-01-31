import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/modules/users/interfaces/user.interface';
import { UsersService } from 'src/modules/users/users.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { FilterEmployeeDto } from './dto/filter-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeDocument } from './schema/employee.schema';
import { EmployeePipe } from './pipes/employee.pipe';
import { QueryEmployeeDto } from './dto/query-employee.dto';
import { CustomQueryService } from '../../services/custom-query.service';

@Injectable()
export class EmployeesService {

  constructor (
    private readonly employeePipe: EmployeePipe,
    private readonly customQueryService: CustomQueryService,
    @Inject(UsersService) private readonly usersService: UsersService,
    @InjectModel('employees') private readonly employeeModel: Model<EmployeeDocument>
  ) {}

  async findOne(id: string) {
    const employee = await this.employeeModel.findById(id);
    if (!employee) throw new NotFoundException('No se ha encontrado al empleado');
    return employee;
  }

  async lookUp (filter: FilterEmployeeDto) {
    const employee = await this.employeeModel.findOne(filter);
    if (!employee) throw new NotFoundException('No se ha encontrado ningún resultado');
    return employee;
  }

  async filter (queryEmployeeDto: QueryEmployeeDto) {
    return await this.customQueryService.filter(queryEmployeeDto, this.employeeModel);
  }

  async create(createEmployeeDto: CreateEmployeeDto) {
    const {email, password} = createEmployeeDto;
    const findEmployee = await this.employeeModel.findOne({email});
    if (findEmployee) throw new NotFoundException('Ya existe un empleado con ese email');
    const user = new User(email, password, true);
    await this.usersService.createUser(user);
    const createdEmployee = await this.employeeModel.create(this.employeePipe.transform(createEmployeeDto));
    return createdEmployee;
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
