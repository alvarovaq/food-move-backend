import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsEnum, IsNotEmpty, IsOptional, IsSemVer, IsString, MaxLength } from "class-validator";
import { IsObjectId } from "class-validator-mongo-object-id";
import { Rating } from "src/shared/enums/rating";
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
    @MaxLength(155, {message: 'Descripción no valida, demasiado largo'})
    @IsOptional()
    description: string;

    @ApiProperty({isArray: true, type: String})
    @IsArray()
    @Type(() => String)
    links: string[];

    @ApiProperty()
    @IsString()
    @MaxLength(155, {message: 'Comentario no valido, demasiado largo'})
    @IsOptional()
    comments: string;

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    date: Date;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    done: boolean;

    @ApiProperty({enum: Rating})
    @IsEnum(Rating)
    @IsOptional()
    rating: Rating;
}
