import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import * as session from 'express-session';
import * as passport from 'passport';

import * as connectRedis from 'connect-redis';
import { Redis } from 'ioredis';

const RedisStore = connectRedis(session);
const redisClient = new Redis();

import appConfig from './config/app.config';
import authConfig from './config/auth.config';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    // TODO Set an env variable for this in prod
    origin: ['http://localhost:4200', 'http://localhost:58159'],
    credentials: true,
  });

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
      // @ts-ignore // typing 🙄
      store: new RedisStore({ client: redisClient }),
      name: 'session_id',
      secret: sessionConfig.session.secret,
      resave: false,
      saveUninitialized: false,
      rolling: true, // -> https://github.com/expressjs/session#rolling
      cookie: {
        maxAge: 2 * 60 * 1000,
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
