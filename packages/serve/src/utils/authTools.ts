import { Injectable } from '@nestjs/common';
import { SecretTool } from './secretTool';

@Injectable()
export class AuthTools {
  constructor(private readonly secretTool: SecretTool) {}

  // 校验
}
