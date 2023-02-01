import { Module } from '@nestjs/common';
import { RoutinesService } from './routines.service';
import { RoutinesController } from './routines.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RoutineSchema } from './schemas/routine.schemas';
import { CustomQueryService } from '../../services/custom-query.service';

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
  providers: [RoutinesService, CustomQueryService]
})
export class RoutinesModule {}
