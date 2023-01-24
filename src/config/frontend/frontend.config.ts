import { registerAs } from '@nestjs/config';

export default registerAs('frontend', () => ({
  redirectUrl: process.env.FRONTEND_REDIRECT_URL,
}));
