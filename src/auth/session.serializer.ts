import { Injectable, Logger } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { UsersService } from 'src/users/users.service';
import { UserWithoutPassword } from './types/auth-user.type';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  private _logger: Logger = new Logger(SessionSerializer.name);
  constructor(private readonly usersService: UsersService) {
    super();
  }
  serializeUser(user: UserWithoutPassword, done: Function) {
    this._logger.log(`Serializing User: "${user.fullName}"`);
    done(null, user.email);
  }
  async deserializeUser(userEmail: string, done: Function) {
    const user: UserWithoutPassword = await this.usersService.findOne(
      userEmail,
    );
    this._logger.log(`Deserializing User: "${user.fullName}"`);
    done(null, user);
  }
}
