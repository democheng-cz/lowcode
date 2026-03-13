import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
