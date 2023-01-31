import { Module } from '@nestjs/common';
import { RoutinesService } from './routines.service';
import { RoutinesController } from './routines.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RoutineSchema } from './schemas/routine.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'routines',
        schema: RoutineSchema
      }
    ])
  ],
  controllers: [RoutinesController],
  providers: [RoutinesService]
})
export class RoutinesModule {}
