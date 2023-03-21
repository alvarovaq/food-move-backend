import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, ValidateNested } from "class-validator";
import { CustomQueryDto } from "src/shared/dto/custom-query.dto";
import { FilterWeeklyDietDto } from './filter-weekly-diet.dto';

export class QueryWeeklyDietDto extends CustomQueryDto {

    @ApiProperty()
    @Type(() => FilterWeeklyDietDto)
    @ValidateNested({each: true})
    @IsOptional()
    filter: FilterWeeklyDietDto;

}