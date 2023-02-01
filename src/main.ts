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

  app.use(
    session({
      // @ts-ignore // typing 🙄
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
        sameSite: 'none',
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  /* -***************- */

  const appEnv: ConfigType<typeof appConfig> = app.get(appConfig.KEY);
  const PORT = appEnv.port;
  await app.listen(PORT, '0.0.0.0', () => {
    logger.log(`App running on port ${PORT}`);
  });
}
bootstrap();
