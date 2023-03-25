import { Module } from '@nestjs/common';
import { DietsService } from './diets.service';
import { DietsController } from './diets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DietSchema } from './schemas/diet.schemas';
import { CustomQueryService } from 'src/services/custom-query.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'diets',
        schema: DietSchema
      }
    ])
  ],
  controllers: [DietsController],
  providers: [DietsService, CustomQueryService]
})
export class DietsModule {}
