import { PartialType } from "@nestjs/swagger";
import { CreateFoodDto } from "./create-food.dto";

export class FindFoodDto extends PartialType(CreateFoodDto) {}