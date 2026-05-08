import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Task Flow API')
    .setDescription(`
## Overview

TaskFlow API is a REST API for collaborative task and board management.

It allows users to:
- authenticate with JWT
- manage boards
- manage board members and roles
- create and update tasks
- enforce permission-based access control

## Authentication

Most endpoints require a **Bearer token**.

To authenticate:
1. Use an authentication endpoint to get a JWT token
2. Click the **Authorize** button in Swagger
3. Enter your token as: \`Bearer <your_token>\`

## Roles

Board permissions depend on the member role:
- **Reader**: can read board data
- **Editor**: can update board content and tasks
- **Maintainer**: can manage most board operations
- **Owner**: full access to the board

## Validation rules

This API uses global validation with:
- automatic payload transformation
- unknown field filtering
- rejection of non-whitelisted fields
      `)
    .setVersion('1.0.0')
    .setExternalDoc(
      'GitHub repository',
      'https://github.com/SebastienCozeDev/task-flow-api',
    )
    .addBearerAuth()
    .addTag('App', 'Operations related to app')
    .addTag('Auth', 'Operations related to the authentication')
    .addTag('Boards', 'Operations related to boards')
    .addTag('Board Members', 'Operations related to board members')
    .addTag('Tasks', 'Operations related to tasks')
    .addTag('Users', 'Operations related to users')
    .build();

  const document = SwaggerModule.createDocument(app, config);

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
