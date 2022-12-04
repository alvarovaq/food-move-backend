import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsObjectId } from "class-validator-mongo-object-id";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateConsultDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsObjectId()
    patient: string;

    @ApiProperty()
    @IsObjectId()
    employee: string;

    @ApiProperty()
    @IsNumber()
    weight: number;
    
    @ApiProperty()
    @IsNumber()
    pressure: number;
    
    @ApiProperty()
    @IsString()
    comments: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    created_at: Date;
}
