import { OmitType, PartialType, ApiProperty } from '@nestjs/swagger';
import { CreatePatientDto } from "./create-patient.dto";
import { IsObjectId } from 'class-validator-mongo-object-id';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CustomQueryDto } from 'src/shared/dto/custom-query.dto';

export class FilterPatientDto extends PartialType(OmitType(CreatePatientDto, ['password'] as const)) {

    @ApiProperty()
    @IsObjectId()
    @IsOptional()
    _id: string;
    
}