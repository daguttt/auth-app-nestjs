import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Post,
  Req,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { Response } from 'express';
import type { Session as ExpressSession } from 'express-session';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import frontendConfig from 'src/config/frontend.config';
import { UserEntity } from 'src/users/entities/user.entity';

import { LocalAuthGuard } from './guards/local-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { GoogleUser } from './types/google-user.interface';
import { AuthService } from './auth.service';
import { SessionGuard } from './guards/session.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(frontendConfig.KEY)
    private readonly config: ConfigType<typeof frontendConfig>,
  ) {}

  @Post('login')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  logIn() {}

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

  @Delete('logout')
  @UseGuards(SessionGuard)
  @HttpCode(204)
  logOut(@Session() session: ExpressSession) {
    return this.authService.logOut(session);
  }
}
