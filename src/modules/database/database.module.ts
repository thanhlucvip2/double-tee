import {
  MYSQL_DB,
  MYSQL_HOST,
  MYSQL_LOGGING,
  MYSQL_PASSWORD,
  MYSQL_PORT,
  MYSQL_USER,
} from '@/configs/app.config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mysql',
      host: MYSQL_HOST,
      port: MYSQL_PORT,
      username: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DB,
      synchronize: false,
      logging: MYSQL_LOGGING,
    }),
  ],
})
export class DatabaseModule {}
