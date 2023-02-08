import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';

export const User = createParamDecorator<keyof UserEntity>(
  (data: keyof UserEntity, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    return data ? user?.[data] : user;
  },
);
