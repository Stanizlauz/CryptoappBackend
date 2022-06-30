import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({
    // origin: "http://localhost:3000",
    origin: ["https://www.arkstrades.com","https://arkstrades.com", "https://capitaltrade.netlify.app", "http://localhost:3000"],
    // origin: "https://capitaltrade.netlify.app",
    credentials: true
  });
  const config = new DocumentBuilder()
    .setTitle('Investments')
    .setDescription('Investment API')
    .setVersion('1.0')
    // .addTag('investments')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // await app.listen(8000);
  await app.listen(process.env.PORT || 8000);
}
bootstrap();
