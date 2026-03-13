import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GenerateCaptcha } from '../utils/generateCaptcha';
@Module({
  controllers: [AuthController],
  providers: [AuthService, GenerateCaptcha],
})
export class AuthModule {}
