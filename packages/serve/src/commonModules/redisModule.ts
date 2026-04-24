import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

import { getRedisConfig } from '../database.config';
import { RedisService } from './redis.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: RedisService,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const client = new Redis(getRedisConfig(configService));
        return new RedisService(client);
      },
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}
