import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GenerateCaptcha } from '../utils/generateCaptcha';
import { GenerateRandomTools } from 'src/utils/generateRandomTools';
import { SendCode as SendCodeTool } from '../utils/sendCode';
@Module({
  controllers: [AuthController],
  providers: [AuthService, GenerateCaptcha, GenerateRandomTools, SendCodeTool],
})
export class AuthModule {}
