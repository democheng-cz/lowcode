import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // 设置全局前缀
  app.setGlobalPrefix('api');

  // 设置全局验证管道

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 自动移除未定义字段
      forbidNonWhitelisted: true, // 出现非法字段直接报错
      transform: true, // 自动类型转换
    }),
  );

  await app.listen(configService.getOrThrow<number>('PORT'));
}
void bootstrap();
