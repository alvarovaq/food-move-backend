import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, IsOptional } from 'class-validator';
import { CreateRecipeDto } from "src/modules/recipes/dto/create-recipe.dto";

export class CreateWeeklyDietDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(100, {message: 'Título no valido, demasiado largo'})
    title: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @MaxLength(155, {message: 'Descripción no valida, demasiado largo'})
    description: string;

    @ApiProperty({type: [CreateRecipeDto]})
    @IsNotEmpty()
    monday: CreateRecipeDto[];

    @ApiProperty({type: [CreateRecipeDto]})
    @IsNotEmpty()
    tuesday: CreateRecipeDto[];

    @ApiProperty({type: [CreateRecipeDto]})
    @IsNotEmpty()
    wednesday: CreateRecipeDto[];

    @ApiProperty({type: [CreateRecipeDto]})
    @IsNotEmpty()
    thursday: CreateRecipeDto[];

    @ApiProperty({type: [CreateRecipeDto]})
    @IsNotEmpty()
    friday: CreateRecipeDto[];

    @ApiProperty({type: [CreateRecipeDto]})
    @IsNotEmpty()
    saturday: CreateRecipeDto[];

    @ApiProperty({type: [CreateRecipeDto]})
    @IsNotEmpty()
    sunday: CreateRecipeDto[];

}
