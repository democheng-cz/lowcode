import { Injectable } from '@nestjs/common';
import { GenerateCaptcha } from '../utils/generateCaptcha';
import { RedisService } from '../commonModules/redis.service';
import { GenerateRandomTools } from '../utils/generateRandomTools';
import { SendCode } from '../utils/sendCode';
@Injectable()
export class AuthService {
  constructor(
    private readonly generateCaptcha: GenerateCaptcha,
    private readonly redisService: RedisService,
    private readonly generateRandomTools: GenerateRandomTools,
    private readonly SendCodeTool: SendCode,
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

  async sendCode(phone: string, type: 'login' | 'register') {
    const code = this.generateRandomTools.generateRandomCode();

    try {
      await this.SendCodeTool.sendCode(phone, code);
      const redisKey = `code:${type}:${phone}`;
      await this.redisService.getClient().set(redisKey, code, 'EX', 60 * 5); // 5分钟过期
      return {
        message: '验证码发送成功',
      };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
