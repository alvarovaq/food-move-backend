import { OmitType, PartialType, ApiProperty } from '@nestjs/swagger';
import { CreatePatientDto } from "./create-patient.dto";
import { IsObjectId } from 'class-validator-mongo-object-id';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CustomQueryDto } from 'src/shared/dto/custom-query.dto';

class PatientDto extends PartialType(OmitType(CreatePatientDto, ['password'] as const)) {

    @ApiProperty()
    @IsObjectId()
    @IsOptional()
    _id: string;
    
}

export class FilterPatientDto extends CustomQueryDto {

    @ApiProperty()
    @Type(() => PatientDto)
    @ValidateNested({each: true})
    filter: PatientDto;

}