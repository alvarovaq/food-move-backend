import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true // Los parámetros que no están definidos en los dto se eliminan
  }));
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Food & Move API Documentation')
    .setDescription('Documentation of the api')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('employees')
    .addTag('patients')
    .addTag('consults')
    .addTag('recipes')
    .addTag('routines')
    .addTag('foods')
    .addTag('moves')
    .addTag('diets')
    .addTag('files')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);
  
  await app.listen(3000);
}
bootstrap();
