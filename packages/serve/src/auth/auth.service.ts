import { Injectable } from '@nestjs/common';
import { GenerateCaptcha } from '../utils/generateCaptcha';

@Injectable()
export class AuthService {
  constructor(private readonly generateCaptcha: GenerateCaptcha) {}

  getCaptcha(type: 'login' | 'register') {
    const captcha = this.generateCaptcha.generateCaptcha();
    return {
      status: 200,
      data: {
        captcha: captcha.data,
        captchaId: captcha.text,
      },
    };
  }
}
