import { registerAs } from '@nestjs/config';

const { env } = process;

export default registerAs('session', () => ({
  secret: env.SESSION_SECRET,
  secureCookie: env.SECURE_COOKIE === 'true',
  maxConnectionPooling: Number(env.DATABASE_MAX_CONNECTIONS_POOLING),
}));
