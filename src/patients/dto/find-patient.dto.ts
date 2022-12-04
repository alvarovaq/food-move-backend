import { OmitType, PartialType } from "@nestjs/swagger";
import { CreatePatientDto } from "./create-patient.dto";

export class FindPatientDto extends PartialType(OmitType(CreatePatientDto, ['password'] as const)) {}