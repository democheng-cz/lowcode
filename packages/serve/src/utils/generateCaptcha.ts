// 生成图形验证码
import { Injectable } from '@nestjs/common';
import { create } from 'svg-captcha';
import type { CaptchaObj } from 'svg-captcha';

@Injectable()
export class GenerateCaptcha {
  generateCaptcha(): CaptchaObj {
    return create({
      size: 4,
      color: true,
    });
  }
}
