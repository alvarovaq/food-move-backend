import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreateEmployeeDto } from '../dto/create-employee.dto';

@Injectable()
export class EmployeePipe implements PipeTransform {
  transform(employee: CreateEmployeeDto) {
    return {
      name: employee.name,
      surname: employee.surname,
      email: employee.email,
      phone: employee.phone,
      admin: employee.admin
    };
  }
}
