import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateConsultDto } from "./create-consult.dto";

export class FindConsultDto extends PartialType(CreateConsultDto) {}