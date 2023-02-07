import {
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';

import { SessionGuard } from 'src/auth/guards/session.guard';
import { User } from 'src/auth/decorators/user.decorator';
import { UserWithoutPassword } from 'src/auth/types/auth-user.type';
import { CreatePasswordDto } from './dto/create-password.dto';
import { ArePasswordsEqualPipe } from './pipes/are-passwords-equal/are-passwords-equal.pipe';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  private _logger: Logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(SessionGuard)
  findAll(
    @User('fullName') userFullName: UserWithoutPassword,
  ): Promise<UserEntity[]> {
    this._logger.warn(`User getting all users: ${userFullName}`);
    return this.usersService.findAll();
  }

  @Get('profile')
  @UseGuards(SessionGuard)
  getProfile(@User('email') userEmail: string): Promise<UserEntity> {
    return this.usersService.findOneWithPassword(userEmail);
  }

  @Patch('change-password')
  @UseGuards(SessionGuard)
  @HttpCode(204)
  updateUserPassword(
    @User() user: UserWithoutPassword,
    @Body(ArePasswordsEqualPipe) createPasswordDto: CreatePasswordDto,
  ) {
    this.usersService.setPassword(createPasswordDto, user);
    return;
  }

  @Get('test')
  async getUserWithoutPass(@Query('email') email: string) {
    return await this.usersService.findOneNew(email);
  }
}
