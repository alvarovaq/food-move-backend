import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, IsOptional } from 'class-validator';
import { RecipeDto } from "src/modules/recipes/dto/recipe.dto";

export class DietDto {

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

    @ApiProperty({type: [RecipeDto]})
    @IsNotEmpty()
    monday: RecipeDto[];

    @ApiProperty({type: [RecipeDto]})
    @IsNotEmpty()
    tuesday: RecipeDto[];

    @ApiProperty({type: [RecipeDto]})
    @IsNotEmpty()
    wednesday: RecipeDto[];

    @ApiProperty({type: [RecipeDto]})
    @IsNotEmpty()
    thursday: RecipeDto[];

    @ApiProperty({type: [RecipeDto]})
    @IsNotEmpty()
    friday: RecipeDto[];

    @ApiProperty({type: [RecipeDto]})
    @IsNotEmpty()
    saturday: RecipeDto[];

    @ApiProperty({type: [RecipeDto]})
    @IsNotEmpty()
    sunday: RecipeDto[];

}
