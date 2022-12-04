import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateRoutineDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(100, {message: 'Título no valido, demasiado largo'})
    title: string;

    @ApiProperty()
    @IsString()
    @MaxLength(255, {message: 'Descripción no valido, demasiado largo'})
    description: string;

    @ApiProperty({isArray: true, type: String})
    @IsArray()
    @Type(() => String)
    links: string[];
}
