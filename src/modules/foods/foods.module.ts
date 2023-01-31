import { Module } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { FoodsController } from './foods.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodSchema } from './schemas/food.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'foods',
        schema: FoodSchema
      }
    ])
  ],
  controllers: [FoodsController],
  providers: [FoodsService],
  exports: [FoodsService]
})
export class FoodsModule {}
