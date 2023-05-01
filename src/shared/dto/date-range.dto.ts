import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty } from "class-validator";

export class DateRangeDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    startDate: Date | null;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    endDate: Date | null;

}