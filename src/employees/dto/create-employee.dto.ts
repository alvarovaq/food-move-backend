import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, IsString, IsBoolean, MaxLength, MinLength } from "class-validator";

export class CreateEmployeeDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(255, {message: 'El nombre no es válido, es muy largo'})
    name: string;

    @ApiProperty()
    @IsString()
    @MaxLength(255, {message: 'El apellido no es válido, es muy largo'})
    surname: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
    
    @ApiProperty()
    @IsString()
    phone: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(8, {message: 'La contraseña no es válida, es muy corta. 8 caracteres como mínimo'})
    @MaxLength(128, {message: 'La contraseña no es válida, es muy larga'})
    password: string;

    @ApiProperty()
    @IsBoolean()
    admin: boolean;
}
