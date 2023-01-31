export class User {
    email: string;
    password: string;
    isEmployee: boolean;

    constructor (email: string, password: string, isEmployee: boolean) {
        this.email = email;
        this.password = password;
        this.isEmployee = isEmployee;
    }
}