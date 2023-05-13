import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './shared/options/swagger.options';
import { ValidationPipe } from '@nestjs/common';

async function start() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api/v1');
  app.enableCors();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, swaggerDocument);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const port = configService.get<number>('PORT');
  await app.listen(port, () => {
    console.log(`server is running at ${port}`);
  });
}
start();
