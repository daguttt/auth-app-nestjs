import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

const entitiesPath = join(__dirname, '../../**/entities/*.{js,ts}');
console.log(entitiesPath);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      database: 'users_nestjs',
      port: 5434,
      username: 'postgres',
      password: 'q6bqDzqMArQry8',
      synchronize: true,
      entities: [entitiesPath],
    }),
  ],
})
export class TypeOrmConfigModule {}
