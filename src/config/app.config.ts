import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: process.env.PORT || 3005,
  cors: {
    allowedDomains: process.env.CORS_ALLOWED_DOMAINS.split(','),
  },
}));
