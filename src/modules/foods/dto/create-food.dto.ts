import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength, ValidateNested, IsOptional } from 'class-validator';
import { IsObjectId } from "class-validator-mongo-object-id";
import { Dish } from "src/shared/enums/dish";
import { Mean } from "src/shared/enums/mean";
import { Rating } from '../../../shared/enums/rating';

class Ingredient {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    quantity: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    unit: string;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    isChecked: boolean;
}

export class CreateFoodDto {
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
    
    @ApiProperty({enum: Mean, default: Mean.Almuerzo})
    @IsEnum(Mean)
    mean: Mean;

    @ApiProperty({enum: Dish, default: Dish.Primero})
    @IsEnum(Dish)
    dish: Dish;

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
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    date: Date;

    @ApiProperty({default: false})
    @IsBoolean()
    @IsOptional()
    done: boolean;

    @ApiProperty()
    @ValidateNested({each: true})
    @Type(() => Ingredient)
    ingredients: Ingredient[];

    @ApiProperty({enum: Rating})
    @IsEnum(Rating)
    @IsOptional()
    rating: Rating;
}
