import { Injectable, Logger } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  private _logger: Logger = new Logger(SessionSerializer.name);
  constructor(private readonly usersService: UsersService) {
    super();
  }
  serializeUser(user: any, done: Function) {
    this._logger.debug('Serializing User');
    this._logger.debug({ user });
    done(null, user.email);
  }
  async deserializeUser(userEmail: string, done: Function) {
    this._logger.debug('Deserializing User');
    const user = await this.usersService.findOne(userEmail);
    done(null, user);
  }
}
