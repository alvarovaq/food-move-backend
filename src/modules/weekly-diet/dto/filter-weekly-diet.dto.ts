import { PartialType } from "@nestjs/swagger";
import { CreateWeeklyDietDto } from "./create-weekly-diet.dto";

export class FilterWeeklyDietDto extends PartialType(CreateWeeklyDietDto) {}