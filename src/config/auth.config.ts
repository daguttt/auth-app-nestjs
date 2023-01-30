import { registerAs } from '@nestjs/config';

const { env } = process;

export default registerAs('auth', () => ({
  google: {
    clientID: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    callbackURL: env.GOOGLE_REDIRECT_URI,
  },
}));
