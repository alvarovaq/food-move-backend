import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { IsObjectId } from "class-validator-mongo-object-id";
import { EmployeeDto } from "./employee.dto";

export class FilterEmployeeDto extends PartialType(OmitType(EmployeeDto, ['password'] as const)) {

    @ApiProperty()
    @IsObjectId()
    @IsOptional()
    _id: string;

}