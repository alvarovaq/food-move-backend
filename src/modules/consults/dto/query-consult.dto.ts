import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CustomQueryDto } from '../../../shared/dto/custom-query.dto';
import { FilterConsultDto } from './filter-consult.dto';
import { IsOptional, ValidateNested } from 'class-validator';

export class QueryConsultDto extends CustomQueryDto {

    @ApiProperty()
    @Type(() => FilterConsultDto)
    @ValidateNested({each: true})
    @IsOptional()
    filter: FilterConsultDto;

}