import { registerAs } from '@nestjs/config';

const { env } = process;

export default registerAs('session', () => ({
  secret: env.SESSION_SECRET,
  maxConnectionPooling: Number(env.DATABASE_MAX_CONNECTIONS_POOLING),
}));
