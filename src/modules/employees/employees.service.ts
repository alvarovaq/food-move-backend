import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { FilterEmployeeDto } from './dto/filter-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeDocument } from './schema/employee.schema';
import { QueryEmployeeDto } from './dto/query-employee.dto';
import { CustomQueryService } from '../../services/custom-query.service';
import { FilesService } from '../files/files.service';
import { compare, hash } from 'bcrypt';

@Injectable()
export class EmployeesService {

  constructor (
    private readonly customQueryService: CustomQueryService,
    @Inject(FilesService) private readonly filesService: FilesService,
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
    const new_password = await hash(password, 10);
    const employee = {...createEmployeeDto, password: new_password};
    const createdEmployee = await this.employeeModel.create(employee);
    return createdEmployee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    if (Object.keys(updateEmployeeDto).indexOf('email') >= 0) {
      const prevEmployee = await this.findOne(id);
      if (prevEmployee.email != updateEmployeeDto.email) {
        const findUser = await this.lookUp({email: updateEmployeeDto.email} as FilterEmployeeDto);
        if (findUser) throw new NotFoundException('Ya existe un usuario con ese email');
      }
    }
    const updatedEmployee = await this.employeeModel.findByIdAndUpdate(id, updateEmployeeDto, {new: true});
    if (!updatedEmployee) throw new NotFoundException('No se ha encontrado al empleado');
    return updatedEmployee;
  }

  async remove(id: string) {
    const deletedEmployee = await this.employeeModel.findByIdAndDelete(id);
    if (!deletedEmployee) throw new NotFoundException('No se ha encontrado al empleado');
    return deletedEmployee;
  }

  async upload (id: string, file: Express.Multer.File) {
    await this.removeProfileImage(id, false);
    return await this.employeeModel.findByIdAndUpdate(id, {profile_image: file.filename}, {new: true});
  }

  async removeProfileImage (id: string, updateEmployee: boolean = true) {
    const employee = await this.employeeModel.findById(id);
    await this.filesService.removeProfileImage(employee.profile_image);
    if(updateEmployee) await this.employeeModel.findByIdAndUpdate(id, {profile_image: undefined});
  }

  async login (email: string, password: string) {
    const user = await this.employeeModel.findOne({email});
    if (!user) throw new NotFoundException('No se ha encontrado al usuario');
    const isMatch = await compare(password, user.password);
    if (!isMatch) throw new NotFoundException('Contraseña incorrecta');
    return user;
  }

}
