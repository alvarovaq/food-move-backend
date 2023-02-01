import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { IsObjectId } from "class-validator-mongo-object-id";
import { CreateRoutineDto } from "./create-routine.dto";

export class FilterRoutineDto extends PartialType(CreateRoutineDto) {

    @ApiProperty()
    @IsObjectId()
    @IsOptional()
    _id: string;

}