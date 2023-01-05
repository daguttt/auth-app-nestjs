import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import databaseConfig from '../database/database.config';
import { entitiesPath, migrationsPath } from './typeorm-config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(
    @Inject(databaseConfig.KEY)
    private readonly dbConfig: ConfigType<typeof databaseConfig>,
  ) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const options: TypeOrmModuleOptions = {
      type: 'postgres',
      host: this.dbConfig.host,
      database: this.dbConfig.databaseName,
      port: this.dbConfig.port,
      username: this.dbConfig.username,
      password: this.dbConfig.password,
      synchronize: this.dbConfig.synchronize,
      logging: this.dbConfig.logging,
      entities: [entitiesPath],
      migrations: [migrationsPath],
      migrationsRun: this.dbConfig.migrationsRun,
    };

    return options;
  }
}
