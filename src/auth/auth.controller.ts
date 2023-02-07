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

import { Request, Response } from 'express';
import type { Session as ExpressSession } from 'express-session';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import frontendConfig from 'src/config/frontend.config';
import { UserEntity } from 'src/users/entities/user.entity';

import { LocalAuthGuard } from './guards/local-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { GoogleUser } from './types/google-user.interface';
import { AuthService } from './auth.service';
import { SessionGuard } from './guards/session.guard';
import { User } from './decorators/user.decorator';
import { UserWithoutPassword } from './types/auth-user.type';

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
  register(
    @Body() registerCredetialsDto: CreateUserDto,
    @Req() req: Request,
  ): Promise<void> {
    return this.authService.register(registerCredetialsDto, req);
  }

  @Get('login/federated/google')
  @UseGuards(GoogleAuthGuard)
  loginGoogle() {}

  @Get('user')
  @UseGuards(SessionGuard)
  getProfile(@User() user: UserWithoutPassword): UserWithoutPassword {
    return user;
  }

  @Get('oauth2/google/redirect')
  @UseGuards(GoogleAuthGuard)
  loginGoogleRedirect(@User() user: GoogleUser, @Res() res: Response): void {
    this.authService.handleLoginWithGoogle(user);
    return res.redirect(this.config.redirectUrl);
  }

  @Delete('logout')
  @UseGuards(SessionGuard)
  @HttpCode(204)
  logOut(
    @Session() session: ExpressSession,
    @User('fullName') userFullName: string,
  ): Promise<void> {
    return this.authService.logOut(session, userFullName);
  }
}
