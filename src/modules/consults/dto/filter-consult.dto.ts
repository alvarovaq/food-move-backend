import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { ConsultDto } from "./consult.dto";
import { IsObjectId } from 'class-validator-mongo-object-id';
import { IsOptional } from "class-validator";

export class FilterConsultDto extends PartialType(ConsultDto) {

    @ApiProperty()
    @IsObjectId()
    @IsOptional()
    _id: string;

}