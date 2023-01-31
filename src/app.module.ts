import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeesModule } from './modules/employees/employees.module';
import { UsersModule } from './modules/users/users.module';
import { PatientsModule } from './modules/patients/patients.module';
import { ConsultsModule } from './modules/consults/consults.module';
import { RecipesModule } from './modules/recipes/recipes.module';
import { RoutinesModule } from './modules/routines/routines.module';
import { FoodsModule } from './modules/foods/foods.module';
import { MovesModule } from './modules/moves/moves.module';
import { AuthModule } from './modules/auth/auth.module';
import { CustomQueryService } from './services/custom-query.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://7alvaq7:a1b2c3d4@cluster0.t7lmmdf.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true
  }), EmployeesModule, UsersModule, PatientsModule, ConsultsModule, RecipesModule, RoutinesModule, FoodsModule, MovesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, CustomQueryService],
})
export class AppModule {}
