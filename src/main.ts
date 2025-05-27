import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.port || 4445 
  await app.listen(PORT,() =>{
    console.log(`server running at ${PORT}`);
  });
}
bootstrap();
