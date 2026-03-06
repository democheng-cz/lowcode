// 生成图形验证码
import { Injectable } from '@nestjs/common';
import createSvgCaptcha from 'svg-captcha';
@Injectable()
export class GenerateCaptcha {
  generateCaptcha() {
    return createSvgCaptcha.create({
      size: 4,
      color: true,
      ignoreChars: '0o1i',
      background: '#f0f0f0',
      fontSize: 24,
    });
  }
}
