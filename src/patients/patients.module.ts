import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientSchema } from './schemas/patient.schema';
import { UsersModule } from 'src/users/users.module';
import { ConsultsModule } from 'src/consults/consults.module';
import { FoodsModule } from 'src/foods/foods.module';
import { MovesModule } from 'src/moves/moves.module';
import { CustomQueryService } from '../core/services/custom-query.service';

@Module({
  imports: [MongooseModule.forFeature([
      {
        name: 'patients',
        schema: PatientSchema
      }
    ]),
    UsersModule,
    ConsultsModule,
    FoodsModule,
    MovesModule
  ],
  controllers: [PatientsController],
  providers: [PatientsService, CustomQueryService]
})
export class PatientsModule {}
