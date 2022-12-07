import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app-config.module';
import { TypeOrmConfigModule } from './config/typeorm/typeorm-config.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ErrorsModule } from './errors/errors.module';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmConfigModule,
    UsersModule,
    AuthModule,
    ErrorsModule,
  ],
})
export class AppModule {}
