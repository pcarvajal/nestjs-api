import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Create app server
  const app = await NestFactory.create(AppModule);
  // Run app server
  await app.listen(3000);
}
// Execute Server
bootstrap();
