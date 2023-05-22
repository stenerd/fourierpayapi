import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/exceptions/http-exception.filter';
import { ModelExceptionFilter } from './common/filters/exceptions/model-exception.filter';
import configuration from './config/configuration';
const config = configuration();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new HttpExceptionFilter(), new ModelExceptionFilter());

  const documentation = new DocumentBuilder()
    .setTitle(config.APP_NAME || 'Fourier Pay')
    .setDescription(config.APP_DESC || 'The Fourier Pay')
    .setVersion(config.APP_VER || '1.0')
    .addTag(config.APP_TAG || 'The Fourier Pay')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, documentation);
  SwaggerModule.setup('docs', app, document);

  await app.listen(config.PORT);
  const app_url = await app.getUrl();

  console.log(`Application is running on: ${app_url}`);
  // console.log(`Swagger Docs path: ${app_url}/docs`);
}
bootstrap();
