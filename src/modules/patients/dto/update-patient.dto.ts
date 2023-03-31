import { OmitType, PartialType } from '@nestjs/swagger';
import { PatientDto } from './patient.dto';

export class UpdatePatientDto extends PartialType(OmitType(PatientDto, ['password'] as const)) {}
