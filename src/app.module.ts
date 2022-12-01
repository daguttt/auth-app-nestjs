import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app-config.module';
import { TypeOrmConfigModule } from './config/typeorm/typeorm-config.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AppConfigModule, TypeOrmConfigModule, UsersModule],
})
export class AppModule {}
