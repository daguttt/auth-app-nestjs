import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';
import { config } from 'dotenv';
config();

export const entitiesPath = join(
  __dirname,
  '../../**/entities/*.entity.{js,ts}',
);
export const migrationsPath = join(
  __dirname,
  '../../database/migrations/*.{js,ts}',
);

const { env } = process;
const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: env.DATABASE_HOST,
  database: env.DATABASE_NAME,
  port: Number(env.DATABASE_PORT) || 5434,
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
  logging: env.DATABASE_LOGGING === 'true',
  entities: [entitiesPath],
  migrations: [migrationsPath],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
