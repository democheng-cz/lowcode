import { Injectable } from '@nestjs/common';

@Injectable()
export class GenerateRandomTools {
  // 生成随机数字验证码
  generateRandomCode(length: number = 4) {
    return Math.random()
      .toString(10)
      .substring(2, 2 + length);
  }
}
