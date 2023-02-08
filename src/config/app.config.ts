import { registerAs } from '@nestjs/config';

const { env } = process;

export default registerAs('app', () => ({
  port: env.PORT || 3005,
  trustProxy: env.TRUST_PROXY === 'true',
  cors: {
    allowedDomains: env.CORS_ALLOWED_DOMAINS.split(','),
  },
}));
