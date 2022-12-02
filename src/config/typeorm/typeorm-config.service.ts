import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { entitiesPath, migrationsPath } from './typeorm-config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const options: TypeOrmModuleOptions = {
      type: 'postgres',
      host: this.configService.get('database.host'),
      database: this.configService.get('database.databaseName'),
      port: this.configService.get('database.port'),
      username: this.configService.get('database.username'),
      password: this.configService.get('database.password'),
      synchronize: this.configService.get('database.synchronize'),
      logging: this.configService.get('database.logging'),
      entities: [entitiesPath],
      migrations: [migrationsPath],
      migrationsRun: true,
    };

    return options;
  }
}
