import { Module } from '@nestjs/common';
import { MovesService } from './moves.service';
import { MovesController } from './moves.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { MoveSchema } from './schemas/move.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'moves',
        schema: MoveSchema
      }
    ])
  ],
  controllers: [MovesController],
  providers: [MovesService],
  exports: [MovesService]
})
export class MovesModule {}
