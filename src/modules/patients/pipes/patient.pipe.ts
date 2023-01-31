import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreatePatientDto } from '../dto/create-patient.dto';

@Injectable()
export class PatientPipe implements PipeTransform {
  transform(patient: CreatePatientDto) {
    return {
      name: patient.name,
      surname: patient.surname,
      email: patient.email,
      phone: patient.phone,
      birth: patient.birth
    };
  }
}
