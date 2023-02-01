import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  private _logger: Logger = new Logger(LocalAuthGuard.name);

  async canActivate(context: ExecutionContext) {
    const canContinue = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    this._logger.debug({ attachedUser: request.user });
    await super.logIn(request);
    return canContinue;
  }
}
