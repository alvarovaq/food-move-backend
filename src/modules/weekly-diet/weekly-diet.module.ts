import { Module } from '@nestjs/common';
import { WeeklyDietService } from './weekly-diet.service';
import { WeeklyDietController } from './weekly-diet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WeeklyDietSchema } from './schemas/weekly-diet.schemas';
import { CustomQueryService } from 'src/services/custom-query.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'weekly-diet',
        schema: WeeklyDietSchema
      }
    ])
  ],
  controllers: [WeeklyDietController],
  providers: [WeeklyDietService, CustomQueryService]
})
export class WeeklyDietModule {}
