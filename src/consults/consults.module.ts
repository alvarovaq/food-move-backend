import { Module } from '@nestjs/common';
import { ConsultsService } from './consults.service';
import { ConsultsController } from './consults.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsultSchema } from './schemas/consult.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'consults',
        schema: ConsultSchema
      }
    ])
  ],
  controllers: [ConsultsController],
  providers: [ConsultsService],
  exports: [ConsultsService]
})
export class ConsultsModule {}
