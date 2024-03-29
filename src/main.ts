import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import * as session from 'express-session';
import * as passport from 'passport';

import * as pgSession from 'connect-pg-simple';
import { Pool } from 'pg';

import appConfig from './config/app.config';
import sessionConfig from './config/session.config';
import databaseConfig from './config/database.config';

import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const appEnv: ConfigType<typeof appConfig> = app.get(appConfig.KEY);

  app.enableCors({
    origin: appEnv.cors.allowedDomains,
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
  const sessionEnv: ConfigType<typeof sessionConfig> = app.get(
    sessionConfig.KEY,
  );
  const databaseEnv: ConfigType<typeof databaseConfig> = app.get(
    databaseConfig.KEY,
  );
  const dbPoolForSessions = new Pool({
    host: databaseEnv.host,
    port: databaseEnv.port,
    user: databaseEnv.username,
    password: databaseEnv.password,
    database: databaseEnv.databaseName,
    max: sessionEnv.maxConnectionPooling,
  });
  const PGStore = pgSession(session);

  app.set('trust proxy', appEnv.trustProxy); // Works with secure cookie
  app.use(
    session({
      // @ts-ignore // Stores use to have different interfaces
      store: new PGStore({
        pool: dbPoolForSessions,
        createTableIfMissing: true,
        ttl: 2 * 60 * 1000,
      }),
      name: 'session_id',
      secret: sessionEnv.secret,
      resave: false,
      saveUninitialized: false,
      rolling: true, // -> https://github.com/expressjs/session#rolling
      cookie: {
        maxAge: 2 * 60 * 1000,
        secure: sessionEnv.secureCookie,
        sameSite: sessionEnv.sameSiteCookie,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  /* -***************- */

  const PORT = appEnv.port;
  await app.listen(PORT, '0.0.0.0', () => {
    logger.log(`App running on port ${PORT}`);
  });
}
bootstrap();
