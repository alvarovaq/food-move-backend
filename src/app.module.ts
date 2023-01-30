import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeesModule } from './employees/employees.module';
import { UsersModule } from './users/users.module';
import { PatientsModule } from './patients/patients.module';
import { ConsultsModule } from './consults/consults.module';
import { RecipesModule } from './recipes/recipes.module';
import { RoutinesModule } from './routines/routines.module';
import { FoodsModule } from './foods/foods.module';
import { MovesModule } from './moves/moves.module';
import { AuthModule } from './auth/auth.module';
import { CustomQueryService } from './core/services/custom-query.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://7alvaq7:a1b2c3d4@cluster0.t7lmmdf.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true
  }), EmployeesModule, UsersModule, PatientsModule, ConsultsModule, RecipesModule, RoutinesModule, FoodsModule, MovesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, CustomQueryService],
})
export class AppModule {}
