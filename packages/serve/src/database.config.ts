import type { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import type { RedisOptions } from 'ioredis';
import { User } from './user/entities/user.entity';

function getBooleanConfig(
  configService: ConfigService,
  key: string,
  defaultValue: boolean,
): boolean {
  return configService.get<boolean>(key) ?? defaultValue;
}

export function getTypeOrmConfig(
  configService: ConfigService,
): TypeOrmModuleOptions {
  return {
    type: 'mysql',
    host: configService.getOrThrow<string>('MYSQL_HOST'),
    port: configService.getOrThrow<number>('MYSQL_PORT'),
    username: configService.getOrThrow<string>('MYSQL_USER'),
    password: configService.getOrThrow<string>('MYSQL_PASSWORD'),
    database: configService.getOrThrow<string>('MYSQL_DATABASE'),
    entities: [User],
    synchronize: getBooleanConfig(configService, 'MYSQL_SYNCHRONIZE', false),
  };
}

export function getRedisConfig(configService: ConfigService): RedisOptions {
  return {
    port: configService.getOrThrow<number>('REDIS_PORT'),
    host: configService.getOrThrow<string>('REDIS_HOST'),
    password: configService.get<string>('REDIS_PASSWORD'),
    db: configService.getOrThrow<number>('REDIS_DB'),
    keyPrefix: configService.get<string>('REDIS_KEY_PREFIX') ?? 'lowcode:',
    maxRetriesPerRequest: null,
    enableReadyCheck: true,
    showFriendlyErrorStack: true,
    enableOfflineQueue: true,
    enableAutoPipelining: true,
  };
}
