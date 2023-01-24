import { Injectable } from '@nestjs/common';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

import { comparePasswords } from './utils/compare-password.util';
import { encryptPassword } from './utils/encrypt-password.util';
import { GoogleUser } from './types/google-user.interface';
import { AuthUser } from './types/auth-user.type';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

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

  async register(registerCredentialsDto: CreateUserDto | GoogleUser) {
    // It comes with password when registering with Local Strategy
    if (registerCredentialsDto.password) {
      const { password } = registerCredentialsDto;
      registerCredentialsDto.password = await encryptPassword(password);
    }
    await this.usersService.create(registerCredentialsDto);
  }

  async handleLoginWithGoogle(userToHandle: GoogleUser) {
    const user: UserEntity = await this.usersService.findOne(
      userToHandle.email,
    );

    if (!user) return await this.register(userToHandle);

    await this.usersService.updateUser(userToHandle, user);
  }
}
