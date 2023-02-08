import { registerAs } from '@nestjs/config';

const { env } = process;

export default registerAs('database', () => ({
  databaseName: env.DATABASE_NAME,
  host: env.DATABASE_HOST,
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
  port: Number(env.DATABASE_PORT) || 5434,
  synchronize: env.DATABASE_SYNCHRONIZE === 'true',
  logging: env.DATABASE_LOGGING === 'true',
  migrationsRun: env.DATABASE_MIGRATIONS_RUN === 'true',
}));
