import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Task Flow API')
    .setDescription('API for managing tasks and projects')
    .setVersion('1.0.0')
    .addTag('Users', 'Operations related to users')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe(
    {
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true
    }
  ));
  SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
