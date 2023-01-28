import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ErrorsModule } from 'src/errors/errors.module';
import { AuthModule } from 'src/auth/auth.module';

import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ArePasswordsEqualPipe } from './pipes/are-passwords-equal/are-passwords-equal.pipe';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    ErrorsModule,
    forwardRef(() => AuthModule),
  ],
  providers: [UsersService, ArePasswordsEqualPipe],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
