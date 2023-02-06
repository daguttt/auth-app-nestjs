import { registerAs } from '@nestjs/config';

import type { CookieOptions } from 'express-session';

const { env } = process;

type SameSite = 'true' | 'false' | 'strict' | 'lax' | 'none';

const retrieveSameSiteValue = (
  envVariable: SameSite,
): CookieOptions['sameSite'] => {
  switch (envVariable) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      return envVariable;
  }
};

export default registerAs('session', () => ({
  secret: env.SESSION_SECRET,
  secureCookie: env.SECURE_COOKIE === 'true',
  sameSiteCookie: retrieveSameSiteValue(env.SAMESITE_COOKIE as SameSite),
  maxConnectionPooling: Number(env.DATABASE_MAX_CONNECTIONS_POOLING),
}));
