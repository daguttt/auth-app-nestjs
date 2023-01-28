import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-local';

import { AuthUser } from '../types/auth-user.type';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }
  async validate(email: string, password: string): Promise<AuthUser | null> {
    const authUser = await this.authService.validateUser(email, password);
    if (!authUser)
      throw new BadRequestException('Email or password invalid. Try again');
    return authUser;
  }
}
