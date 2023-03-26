import { Module } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { FoodsController } from './foods.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodSchema } from './schemas/food.schemas';
import { DietsService } from '../diets/diets.service';
import { CustomQueryService } from 'src/services/custom-query.service';
import { DietsModule } from '../diets/diets.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'foods',
        schema: FoodSchema
      }
    ]),
    DietsModule
  ],
  controllers: [FoodsController],
  providers: [FoodsService],
  exports: [FoodsService]
})
export class FoodsModule {}
