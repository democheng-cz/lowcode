import { Injectable } from '@nestjs/common';
import { GenerateCaptcha } from '../utils/generateCaptcha';
import { RedisService } from '../commonModules/redis.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly generateCaptcha: GenerateCaptcha,
    private readonly redisService: RedisService,
  ) {}

  async getCaptcha(type: 'login' | 'register') {
    const captcha = this.generateCaptcha.generateCaptcha();

    const captchaKey = `captcha:${type}:${captcha.text}`;
    await this.redisService.getClient().set(captchaKey, captcha.text, 'EX', 60); // 5分钟过期

    return {
      captcha: captcha.data,
      captchaId: captcha.text,
    };
  }
}
