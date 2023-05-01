import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty } from "class-validator";

export class DateRangeDto {

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    startDate: Date | null | undefined;

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    endDate: Date | null | undefined;

}