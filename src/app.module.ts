import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app-config.module';
import { TypeOrmConfigModule } from './config/typeorm/typeorm-config.module';
import { UsersModule } from './users/users.module';
import { ErrorsModule } from './errors/errors.module';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmConfigModule,
    UsersModule,
    ErrorsModule,
  ],
})
export class AppModule {}
