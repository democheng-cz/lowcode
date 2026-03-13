import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import type { RedisOptions } from 'ioredis';
import { User } from './user/entities/user.entity';

// mysql连接
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '761862',
  database: 'next-demo',
  entities: [User],
  synchronize: true,
};

// redis连接

export const redisConfig: RedisOptions = {
  port: 6379,
  host: '127.0.0.1',
  password: '123456',
  db: 0,
  keyPrefix: 'lowcode:',
  maxRetriesPerRequest: null,
  enableReadyCheck: true,
  showFriendlyErrorStack: true,
  enableOfflineQueue: true,
  enableAutoPipelining: true,
};
