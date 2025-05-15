import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 5000
  await app.listen(PORT);
  console.log('success');
  Logger.log(`Server is running on: ${PORT}`)
}
bootstrap()
