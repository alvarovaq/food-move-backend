import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeSchema } from './schema/employee.schema';
import { CustomQueryService } from '../../services/custom-query.service';
import { FilesService } from '../files/files.service';
import { MailModule } from '../mail/mail.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtForgotPassword } from './constants/jwt-forgot-password.constants';
import { JwtForgotPasswordStrategy } from './strategys/jwt-forgot-password.strategy';

@Module({
  imports: [MongooseModule.forFeature([
      {
        name: 'employees',
        schema: EmployeeSchema
      }
    ]),
    JwtModule.register({
      secret: jwtForgotPassword.secret,
      signOptions: { expiresIn: jwtForgotPassword.expiresIn }
    }),
    MailModule
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService, FilesService, CustomQueryService, JwtForgotPasswordStrategy],
  exports: [EmployeesService]
})
export class EmployeesModule {}
