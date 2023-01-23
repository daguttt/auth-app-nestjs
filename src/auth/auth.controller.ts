import {
  Body,
  Controller,
  Get,
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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
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

  @Get('oauth2/google/redirect')
  @UseGuards(GoogleAuthGuard)
  loginGoogleRedirect(@Req() req: { user: GoogleUser }, @Res() res: Response) {
    this.authService.handleLoginWithGoogle(req.user);
    return res.redirect('/users');
  }
}
