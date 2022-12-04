import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreatePatientDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(255, {message: 'El nombre no es válido, es muy largo'})
    name: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @MaxLength(255, {message: 'El apellido no es válido, es muy largo'})
    surname: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(8, {message: 'La contraseña no es válida, es muy corta. 8 caracteres como mínimo'})
    @MaxLength(128, {message: 'La contraseña no es válida, es muy larga'})
    password: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    phone: string;

    @ApiProperty()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    birth: Date;
}
