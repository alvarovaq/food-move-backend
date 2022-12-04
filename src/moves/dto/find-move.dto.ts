import { PartialType } from "@nestjs/swagger";
import { CreateMoveDto } from "./create-move.dto";

export class FindMoveDto extends PartialType(CreateMoveDto) {}