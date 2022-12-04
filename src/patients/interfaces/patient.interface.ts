import { CreatePatientDto } from "../dto/create-patient.dto";

export class Patient {
    
    name: string;
    surname: string;
    email: string;
    phone: string;
    birth: Date;

    constructor (createPatientDto: CreatePatientDto) {
        this.name = createPatientDto.name;
        this.surname = createPatientDto.surname;
        this.email = createPatientDto.email;
        this.phone = createPatientDto.phone;
        this.birth = createPatientDto.birth;
    }

}