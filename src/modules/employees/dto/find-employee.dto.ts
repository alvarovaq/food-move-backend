import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateEmployeeDto } from "./create-employee.dto";

export class FindEmployeeDto extends PartialType(OmitType(CreateEmployeeDto, ['password'] as const)) {}