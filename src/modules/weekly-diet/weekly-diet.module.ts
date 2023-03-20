import { Module } from '@nestjs/common';
import { WeeklyDietService } from './weekly-diet.service';
import { WeeklyDietController } from './weekly-diet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WeeklyDietSchema } from './schemas/weekly-diet.schemas';

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
  providers: [WeeklyDietService]
})
export class WeeklyDietModule {}
