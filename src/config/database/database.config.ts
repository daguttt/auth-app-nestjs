import { registerAs } from '@nestjs/config';

const { env } = process;

export default registerAs('database', () => ({
  database: env.DATABASE_NAME,
  host: env.DATABASE_HOST,
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
  port: Number(env.DATABASE_PORT) || 5434,
}));
