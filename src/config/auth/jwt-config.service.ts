import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import jwtConfig from './auth.config';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly config: ConfigType<typeof jwtConfig>,
  ) {}
  async createJwtOptions(): Promise<JwtModuleOptions> {
    return {
      secret: this.config.jwt.secret,
      signOptions: {
        expiresIn: '2h',
      },
    };
  }
}
