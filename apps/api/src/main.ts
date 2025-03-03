import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://blog-turborepo.vercel.app', // Thay bằng URL front-end của bạn
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe())
  app.useLogger(new Logger());
  await app.listen(process.env.PORT ?? 8000);

}
bootstrap();
