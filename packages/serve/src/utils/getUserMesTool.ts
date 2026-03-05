/**
 * 自定义参数装饰器
 */

import { createParamDecorator } from '@nestjs/common';
import type { ExecutionContext } from '@nestjs/common';

// 获取用户的ip地址
export const GetUserIp = createParamDecorator((data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<{ ip: string }>();
  const ip = request.ip;
  // 对获取的ip格式做处理
  const ipFormat = ip.replace('::ffff:', '');
  return ipFormat;
});

// 获取用户的地址信息
export const GetUserAgent = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const agent = request.headers['user-agent'] as string;
    return agent;
  },
);
