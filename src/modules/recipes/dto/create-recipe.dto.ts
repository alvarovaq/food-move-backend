import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";
import { IsObjectId } from "class-validator-mongo-object-id";
import { Dish } from "../../../shared/enums/dish";
import { Mean } from "src/shared/enums/mean";

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
}

export class CreateRecipeDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(100, {message: 'Título no valido, demasiado largo'})
    title: string;

    @ApiProperty()
    @IsString()
    @MaxLength(155, {message: 'Descripción no valido, demasiado largo'})
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
    @ValidateNested({each: true})
    @Type(() => Ingredient)
    ingredients: Ingredient[];
}
