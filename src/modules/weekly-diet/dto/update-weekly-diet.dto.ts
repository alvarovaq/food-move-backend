import { PartialType } from '@nestjs/swagger';
import { CreateWeeklyDietDto } from './create-weekly-diet.dto';

export class UpdateWeeklyDietDto extends PartialType(CreateWeeklyDietDto) {}
