import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

const start = async() => {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const PORT = process.env.API_PORT || 3333;
  await app.listen(PORT, () => {
    console.log(`SERVER RUNING IN PORT: "${PORT}"`);
  });
}
start();