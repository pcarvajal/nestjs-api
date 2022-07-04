import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { GlobalExceptionFilter } from './filters/exceptions/global-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // Create app server
  const app = await NestFactory.create(AppModule);
  // Custom exceptions filter
  app.useGlobalFilters(new GlobalExceptionFilter());
  // Global endpoints validation
  app.useGlobalPipes(new ValidationPipe());
  // Version
  app.setGlobalPrefix('/v1/');
  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Tasks example')
    .setDescription('The tasks API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // Run app server
  await app.listen(AppModule.port);
}
// Execute Server
bootstrap();
