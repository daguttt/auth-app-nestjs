import { Inject, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

import authConfig from 'src/config/auth.config';

import { GoogleUser } from '../types/google-user.interface';

export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  private logger = new Logger('GoogleStrategy');
  constructor(
    @Inject(authConfig.KEY)
    config: ConfigType<typeof authConfig>,
  ) {
    super({
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackURL,
      scope: ['profile', 'email'],
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const user: GoogleUser = {
      fullName: profile.displayName,
      email: profile.emails[0].value,
      photo: profile.photos[0].value,
    };
    this.logger.log(`User logged in with Google: ${user.fullName}`);
    done(null, user);
  }
}
