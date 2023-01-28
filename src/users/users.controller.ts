import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';

import { Request } from 'express';

import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { SessionGuard } from 'src/auth/guards/session.guard';
import { CreatePasswordDto } from './dto/create-password.dto';
import { ArePasswordsEqualPipe } from './pipes/are-passwords-equal/are-passwords-equal.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(SessionGuard)
  findAll(@Req() req: Request) {
    console.log({ user: req.user });
    return this.usersService.findAll();
  }

  @Get('profile')
  @UseGuards(SessionGuard)
  getProfile(@Req() req: { user: UserEntity }) {
    return this.usersService.findOneWithPassword(req.user.email);
  }

  @Patch('change-password')
  @UseGuards(SessionGuard)
  @HttpCode(204)
  updateUserPassword(
    @Req() req: { user: UserEntity },
    @Body(ArePasswordsEqualPipe) createPasswordDto: CreatePasswordDto,
  ) {
    this.usersService.setPassword(createPasswordDto, req.user);
    return;
  }
}
