import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientSchema } from './schemas/patient.schema';
import { UsersModule } from 'src/modules/users/users.module';
import { ConsultsModule } from 'src/modules/consults/consults.module';
import { FoodsModule } from 'src/modules/foods/foods.module';
import { MovesModule } from 'src/modules/moves/moves.module';
import { CustomQueryService } from 'src/services/custom-query.service';
import { PatientPipe } from './pipes/patient.pipe';

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
  providers: [PatientsService, CustomQueryService, PatientPipe]
})
export class PatientsModule {}
