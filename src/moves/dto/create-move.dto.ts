import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsEnum, IsNotEmpty, IsSemVer, IsString, MaxLength } from "class-validator";
import { IsObjectId } from "class-validator-mongo-object-id";
export class CreateMoveDto {
    @ApiProperty()
    @IsObjectId()
    @IsNotEmpty()
    patient: string;

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

    @ApiProperty()
    @IsObjectId()
    employee: string;

    @ApiProperty()
    @IsString()
    comments: string;

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    date: Date;

    @ApiProperty()
    @IsBoolean()
    done: boolean;
}
