import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { CreateConsultDto } from "./create-consult.dto";
import { IsObjectId } from 'class-validator-mongo-object-id';
import { IsOptional } from "class-validator";

export class FilterConsultDto extends PartialType(CreateConsultDto) {

    @ApiProperty()
    @IsObjectId()
    @IsOptional()
    _id: string;

}