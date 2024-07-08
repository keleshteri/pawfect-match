import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './modules/common/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  app.setGlobalPrefix('api/v1');
  app.enableCors();
  //validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  //Swagger setup
  const options = new DocumentBuilder()
    .setTitle('Puppies API')
    .setDescription('Apis for adapting puppies')
    .setVersion('1.0')
    .addTag('puppies')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  app.useGlobalFilters(new AllExceptionsFilter());
  const port = process.env.PORT || 3000;
  await app.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}`),
  );
}
bootstrap();
