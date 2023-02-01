import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { IsObjectId } from "class-validator-mongo-object-id";
import { CreateRecipeDto } from "./create-recipe.dto";

export class FilterRecipeDto extends PartialType(CreateRecipeDto) {

    @ApiProperty()
    @IsObjectId()
    @IsOptional()
    _id: string;

}