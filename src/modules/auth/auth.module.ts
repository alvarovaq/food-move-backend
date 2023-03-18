import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt.constants';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategys/jwt.strategy';
import { PatientsModule } from '../patients/patients.module';
import { EmployeesModule } from '../employees/employees.module';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn }
    }),
    PatientsModule,
    EmployeesModule
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
