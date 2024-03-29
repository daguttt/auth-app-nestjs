import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import appConfig from './app.config';
import authConfig from './auth.config';
import databaseConfig from './database.config';
import frontendConfig from './frontend.config';
import sessionConfig from './session.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.production'],
      load: [
        appConfig,
        databaseConfig,
        authConfig,
        frontendConfig,
        sessionConfig,
      ],
    }),
  ],
})
export class AppConfigModule {}
