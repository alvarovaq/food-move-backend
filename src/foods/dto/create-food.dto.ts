import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength, ValidateNested } from "class-validator";
import { IsObjectId } from "class-validator-mongo-object-id";
import { SubtypeFood } from "src/recipes/enums/subtype-food.enum";
import { TypeFood } from "src/recipes/enums/type-food.enums";

class Ingredient {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNumber()
    quantity: number;

    @ApiProperty()
    @IsString()
    unit: string;
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
    @MaxLength(255, {message: 'Descripción no valido, demasiado largo'})
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
    @IsObjectId()
    employee: string;

    @ApiProperty()
    @IsString()
    comments: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    date: Date;

    @ApiProperty({default: false})
    @IsBoolean()
    done: boolean;

    @ApiProperty()
    @ValidateNested({each: true})
    @Type(() => Ingredient)
    ingredients: Ingredient[];
}
