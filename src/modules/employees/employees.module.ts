import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeSchema } from './schema/employee.schema';
import { UsersModule } from 'src/modules/users/users.module';
import { EmployeePipe } from './pipes/employee.pipe';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: 'employees',
      schema: EmployeeSchema
    }
  ]), UsersModule],
  controllers: [EmployeesController],
  providers: [EmployeesService, EmployeePipe]
})
export class EmployeesModule {}
