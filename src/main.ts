import 'dotenv/config';

console.log('NODE_ENV =', process.env.NODE_ENV);

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
console.log('Loading env file:', envFile);
require('dotenv').config({ path: envFile });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SeedService } from './seed/seed.service';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
declare const module: any;

console.log('NODE_ENV =', process.env.NODE_ENV);
// console.log('RAILWAY ENV:', process.env);

// console.log('USERNAME:', process.env.USERNAME);
// console.log('PASSWORD:', process.env.PASSWORD);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // * Uncomment the following lines to run the seeding process on application startup
  // const seedService = app.get(SeedService);
  // await seedService.seed();
  const config = new DocumentBuilder() //1
    .setTitle('Spotify Clone')
    .setDescription('The Spotify Clone Api documentation')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // We will use this Bearer Auth with the JWT-auth name on thecontroller function
    )
    .build();
  const document = SwaggerModule.createDocument(app, config); //2
  SwaggerModule.setup('api', app, document); //3

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  await app.listen(port!);

  console.log(`Application is running on: http://localhost:${port}`);
  console.log('kkkkkkkkkkkk', configService.get<string>('NODE_ENV'));

  // Hot Module Replacement
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
