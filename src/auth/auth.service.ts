import { Injectable, Logger } from '@nestjs/common';

import type { Session as ExpressSession } from 'express-session';
import { Request } from 'express';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

import { comparePasswords } from './utils/compare-password.util';
import { encryptPassword } from './utils/encrypt-password.util';
import { GoogleUser } from './types/google-user.interface';
import { AuthUser, UserWithoutPassword } from './types/auth-user.type';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Injectable()
export class AuthService {
  private _logger: Logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly localAuthGuard: LocalAuthGuard,
  ) {}

  /**
   * Validate user for the LocalStrategy
   */
  async validateUser(email: string, pass: string): Promise<AuthUser | null> {
    const user = await this.usersService.findOneWithPassword(email);
    if (!user) return null;

    const areSamePasswords = await comparePasswords(pass, user.password);
    if (!areSamePasswords) return null;

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Register user and initialize its session
   * @param registerCredentialsDto
   * @param request Necessary for initializing user session
   */
  async register(
    registerCredentialsDto: CreateUserDto | GoogleUser,
    request?: Request,
  ): Promise<void> {
    // It comes with password when registering with Local Strategy
    if (registerCredentialsDto.password) {
      const { password } = registerCredentialsDto;
      registerCredentialsDto.password = await encryptPassword(password);
    }
    const { password, ...registeredUser } = await this.usersService.create(
      registerCredentialsDto,
    );
    // Initialize user in session
    if (request) {
      request.user = registeredUser as UserWithoutPassword;
      await this.localAuthGuard.logIn(request);
    }
  }

  async handleLoginWithGoogle(userToHandle: GoogleUser) {
    const user: UserEntity = await this.usersService.findOne(
      userToHandle.email,
    );

    if (!user) return await this.register(userToHandle);

    await this.usersService.updateUser(userToHandle, user);
  }

  async logOut(session: ExpressSession): Promise<void> {
    session.destroy(() => {
      this._logger.log('User logged out');
      return;
    });
  }
}
