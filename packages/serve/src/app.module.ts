import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { RedisModule } from './commonModules/redisModule';
import { envValidationSchema } from './config/env.validation';
import { getTypeOrmConfig } from './database.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: envValidationSchema,
      envFilePath: [
        'packages/serve/.env.local',
        'packages/serve/.env',
        '.env.local',
        '.env',
      ],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        getTypeOrmConfig(configService),
    }),
    RedisModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
