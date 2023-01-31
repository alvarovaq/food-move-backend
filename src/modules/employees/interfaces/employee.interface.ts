import { CreateEmployeeDto } from "../dto/create-employee.dto";

export class Employee {

    name: string;
    surname: string;
    email: string;
    phone: string;
    admin: boolean;

    constructor (private readonly createEmployeeDto: CreateEmployeeDto) {
        this.name = createEmployeeDto.name;
        this.surname = createEmployeeDto.surname;
        this.email = createEmployeeDto.email;
        this.phone = createEmployeeDto.phone;
        this.admin = createEmployeeDto.admin;
    }
    
}