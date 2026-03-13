import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GenerateCaptcha } from '../utils/generateCaptcha';
import { GenerateRandomTools } from 'src/utils/generateRandomTools';
import { SendCode as SendCodeTool } from '../utils/sendCode';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { SecretTool } from '../utils/secretTool';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    AuthService,
    GenerateCaptcha,
    GenerateRandomTools,
    SendCodeTool,
    SecretTool,
  ],
})
export class AuthModule {}
