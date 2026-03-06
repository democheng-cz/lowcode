// 用于加密的装饰器
import { Injectable } from '@nestjs/common';
import { createHash } from 'node:crypto';

@Injectable()
export class SecretTool {
  // 用于加密
  encrypt(
    data: string,
    secretType: 'md5' | 'sha1' | 'sha256' | 'sha512' = 'md5',
  ) {
    return createHash(secretType).update(data).digest('hex');
  }
}
