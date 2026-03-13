import { Module, Global } from '@nestjs/common';
import { Redis } from 'ioredis';
import { redisConfig } from '../database.config';
import { RedisService } from './redis.service';

@Global()
@Module({
  providers: [
    {
      provide: RedisService,
      useFactory: () => {
        const client = new Redis(redisConfig);
        return new RedisService(client);
      },
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}
