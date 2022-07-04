import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { GlobalExceptionFilter } from './filters/exceptions/global-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Create app server
  const app = await NestFactory.create(AppModule);
  // Custom exceptions filter
  app.useGlobalFilters(new GlobalExceptionFilter());
  // Global endpoints validation
  app.useGlobalPipes(new ValidationPipe());
  // Run app server
  await app.listen(AppModule.port);
}
// Execute Server
bootstrap();
