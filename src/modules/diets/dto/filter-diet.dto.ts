import { PartialType } from "@nestjs/swagger";
import { CreateDietDto } from "./create-diet.dto";

export class FilterDietDto extends PartialType(CreateDietDto) {}