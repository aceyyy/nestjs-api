import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix("api");
  app.enableCors({
    // adjust if needed
    origin: "*",
    methods: 'GET,PUT,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    preflightContinue: false,
  });

  await app.listen(3000);
}

bootstrap();
