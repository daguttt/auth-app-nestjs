import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

import { Response } from 'express';

import { CreateUserDto } from 'src/users/dto/create-user.dto';

import { LocalAuthGuard } from './guards/local-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { GoogleUser } from './types/google-user.interface';
import { AuthService } from './auth.service';
import { ConfigType } from '@nestjs/config';
import frontendConfig from 'src/config/frontend/frontend.config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(frontendConfig.KEY)
    private readonly config: ConfigType<typeof frontendConfig>,
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  logIn() {
    return { ok: true };
  }

  @Post('register')
  register(@Body() registerCredetialsDto: CreateUserDto) {
    return this.authService.register(registerCredetialsDto);
  }

  @Get('login/federated/google')
  @UseGuards(GoogleAuthGuard)
  loginGoogle() {}

  @Get('user')
  @UseGuards(SessionGuard)
  getProfile(@Req() req: { user: UserEntity }) {
    return req.user;
  }

  @Get('oauth2/google/redirect')
  @UseGuards(GoogleAuthGuard)
  loginGoogleRedirect(@Req() req: { user: GoogleUser }, @Res() res: Response) {
    this.authService.handleLoginWithGoogle(req.user);
    return res.redirect(this.config.redirectUrl);
  }
}
