import { OmitType, PartialType } from '@nestjs/swagger';
import { EmployeeDto } from './employee.dto';

export class UpdateEmployeeDto extends PartialType(OmitType(EmployeeDto, ['password'] as const)) {}
