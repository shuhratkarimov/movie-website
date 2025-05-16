import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = Number(process.env.PORT)
  const app = await NestFactory.create(AppModule);
  
  await app.listen(PORT, () => {
    console.log("server is running at the port " + PORT);
  });
}
bootstrap();
