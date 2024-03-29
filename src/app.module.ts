import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeesModule } from './modules/employees/employees.module';
import { PatientsModule } from './modules/patients/patients.module';
import { ConsultsModule } from './modules/consults/consults.module';
import { RecipesModule } from './modules/recipes/recipes.module';
import { RoutinesModule } from './modules/routines/routines.module';
import { FoodsModule } from './modules/foods/foods.module';
import { MovesModule } from './modules/moves/moves.module';
import { AuthModule } from './modules/auth/auth.module';
import { CustomQueryService } from './services/custom-query.service';
import { UploadsService } from './services/uploads.service';
import { FilesModule } from './modules/files/files.module';
import { DietsModule } from './modules/diets/diets.module';
import { AttachmentsModule } from './modules/attachments/attachments.module';
import { MailModule } from './modules/mail/mail.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://7alvaq7:a1b2c3d4@cluster0.t7lmmdf.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true
  }),
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
  }),
  EmployeesModule, PatientsModule, ConsultsModule, RecipesModule, RoutinesModule, FoodsModule, MovesModule, AuthModule, FilesModule, DietsModule, AttachmentsModule, MailModule],
  controllers: [AppController],
  providers: [AppService, CustomQueryService, UploadsService],
})
export class AppModule {}
