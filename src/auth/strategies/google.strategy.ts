import { Inject, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

import authConfig from 'src/config/auth/auth.config';

import { GoogleUser } from '../types/google-user.interface';
import { AuthService } from '../auth.service';

export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  private logger = new Logger('GoogleStrategy');
  constructor(
    @Inject(authConfig.KEY)
    config: ConfigType<typeof authConfig>,
    private readonly authService: AuthService,
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
    this.logger.debug({
      accessToken,
      refreshToken,
      profile,
    });
    const user: GoogleUser = {
      fullName: profile.displayName,
      email: profile.emails[0].value,
      photo: profile.photos[0].value,
    };
    this.logger.debug({ user });
    done(null, user);
  }
}
