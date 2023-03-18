import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthEmployeeDto } from './dto/auth-employee.dto';
import { AuthService } from './auth.service';
import { AuthPatientDto } from './dto/auth-patient.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor (private readonly authService: AuthService) {}

    @Post('loginPatient')
    async loginPatient (@Body() authPatientDto: AuthPatientDto) {
        return await this.authService.loginPatient(authPatientDto);
    }

    @Post('loginEmployee')
    async loginEmployee (@Body() authEmployeeDto: AuthEmployeeDto) {
        return await this.authService.loginEmployee(authEmployeeDto);
    }

}
