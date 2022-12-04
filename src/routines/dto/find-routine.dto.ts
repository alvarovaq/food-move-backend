import { PartialType } from "@nestjs/swagger";
import { CreateRoutineDto } from "./create-routine.dto";

export class FindRoutineDto extends PartialType(CreateRoutineDto) {}