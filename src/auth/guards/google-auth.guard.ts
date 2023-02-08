import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  async canActivate(context: ExecutionContext) {
    // It needs to be in a variable in order to execute the strategy FIRST than the .logIn() method
    const canContinue = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    // It handles all stuff about session
    await super.logIn(request);
    return canContinue;
  }
}
