import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthUser } from './types/auth-user.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @UseGuards(LocalAuthGuard)
  logIn(@Request() res: { user: AuthUser }) {
    return this.authService.logIn(res.user);
  }

  @Post('register')
  register(@Body() registerCredetialsDto: CreateUserDto) {
    return this.authService.register(registerCredetialsDto);
  }
}
