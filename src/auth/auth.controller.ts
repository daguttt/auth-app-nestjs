import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthUser } from './types/auth-user.type';
import { AuthGuard } from '@nestjs/passport';
import { AuthPayload } from './types/auth-payload.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @UseGuards(LocalAuthGuard)
  logIn(@Req() req: { user: AuthUser }): Promise<AuthPayload> {
    return this.authService.logIn(req.user);
  }

  @Post('register')
  register(@Body() registerCredetialsDto: CreateUserDto): Promise<AuthPayload> {
    return this.authService.register(registerCredetialsDto);
  }

  @Get('login/federated/google')
  @UseGuards(AuthGuard('google'))
  loginGoogle() {
    throw new InternalServerErrorException();
  }

  @Get('oauth2/google/redirect')
  @UseGuards(AuthGuard('google'))
  loginGoogleRedirect(@Req() req: { user: CreateUserDto }) {
    return this.authService.handleLoginWithGoogle(req.user);
  }
}
