import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/exceptions/http-exception.filter';

async function bootstrap() {
  // Create app server
  const app = await NestFactory.create(AppModule);
  // Custom exceptions filter
  app.useGlobalFilters(new HttpExceptionFilter());
  // Run app server
  await app.listen(3000);
}
// Execute Server
bootstrap();
