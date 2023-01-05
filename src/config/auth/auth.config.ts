import { registerAs } from '@nestjs/config';

const { env } = process;

export default registerAs('auth', () => ({
  jwt: {
    secret: env.JWT_SECRET,
  },
  google: {
    clientID: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    callbackURL: env.GOOGLE_REDIRECT_URI,
  },
}));
