import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import * as session from 'express-session';
import * as passport from 'passport';

import appConfig from './config/app/app.config';

import { AppModule } from './app.module';
import authConfig from './config/auth/auth.config';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  /* -***************- */
  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  /* -***************- */

  /* -***************- */
  /* Session */
  const sessionConfig: ConfigType<typeof authConfig> = app.get(authConfig.KEY);
  app.use(
    session({
      name: 'session_id',
      secret: sessionConfig.session.secret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 10 * 1000,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  /* -***************- */

  const config: ConfigType<typeof appConfig> = app.get(appConfig.KEY);
  const PORT = config.port;
  await app.listen(PORT, '0.0.0.0', () => {
    logger.log(`App running on port ${PORT}`);
  });
}
bootstrap();
