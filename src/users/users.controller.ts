import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { Request } from 'express';

import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { SessionGuard } from 'src/auth/guards/session.guard';

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
  getProfile(@Req() req: { user: UserEntity }) {
    return req.user;
  }
}
