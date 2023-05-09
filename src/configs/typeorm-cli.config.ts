import { DataSource } from 'typeorm';

import {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DB,
  MYSQL_LOGGING,
} from './app.config';
import { createUserTable1683618132875 } from '@/migrations/1683618132875-create-user-table';

export default new DataSource({
  type: 'mysql',
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  username: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DB,
  logging: MYSQL_LOGGING,
  migrations: [createUserTable1683618132875],
});
