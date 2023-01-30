import { OmitType, PartialType, ApiProperty } from '@nestjs/swagger';
import { CreatePatientDto } from "./create-patient.dto";
import { IsObjectId } from 'class-validator-mongo-object-id';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { QueryDto } from '../../core/dto/query.dto';

class PatientDto extends PartialType(OmitType(CreatePatientDto, ['password'] as const)) {

    @ApiProperty()
    @IsObjectId()
    @IsOptional()
    _id: string;
    
}

export class FilterPatientDto extends QueryDto {

    @ApiProperty()
    @Type(() => PatientDto)
    @ValidateNested({each: true})
    filter: PatientDto;

}