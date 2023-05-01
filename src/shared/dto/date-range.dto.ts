import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty } from "class-validator";

export class DateRangeDto {

    @ApiProperty()
    @Type(() => Date)
    startDate: Date | null | undefined;

    @ApiProperty()
    @Type(() => Date)
    endDate: Date | null | undefined;

}