import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(private readonly client: Redis) {}

  getClient(): Redis {
    return this.client;
  }

  set(...args: Parameters<Redis['set']>): ReturnType<Redis['set']> {
    return this.client.set(...args);
  }
}
