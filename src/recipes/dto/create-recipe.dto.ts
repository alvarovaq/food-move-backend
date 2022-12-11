import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";
import { IsObjectId } from "class-validator-mongo-object-id";
import { SubtypeFood } from "../enums/subtype-food.enum";
import { TypeFood } from "../enums/type-food.enums";

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
    @MaxLength(255, {message: 'Descripción no valido, demasiado largo'})
    @IsOptional()
    description: string;
    
    @ApiProperty({enum: TypeFood, default: TypeFood.Comida})
    @IsEnum(TypeFood)
    type: TypeFood;

    @ApiProperty({enum: SubtypeFood, default: SubtypeFood.Primero})
    @IsEnum(SubtypeFood)
    subtype: SubtypeFood;

    @ApiProperty({isArray: true, type: String})
    @IsArray()
    @Type(() => String)
    links: string[];

    @ApiProperty()
    @ValidateNested({each: true})
    @Type(() => Ingredient)
    ingredients: Ingredient[];
}
