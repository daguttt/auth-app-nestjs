import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './app/app.config';
import databaseConfig from './database/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.production'],
      load: [appConfig, databaseConfig],
    }),
  ],
})
export class AppConfigModule {}
