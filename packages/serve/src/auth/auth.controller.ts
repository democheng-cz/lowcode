import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, GetCaptchaDto, SendCodeDto, LoginAuthDto } from './dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginAuthDto) {
    return this.authService.login(dto);
  }

  @Post('register')
  async register(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.register(createAuthDto);
  }

  @Get('captcha')
  getCaptcha(@Query() dto: GetCaptchaDto) {
    return this.authService.getCaptcha(dto.type);
  }

  @Post('sendCode')
  sendCode(@Body() dto: SendCodeDto) {
    const { phone, type } = dto;
    return this.authService.sendCode(phone, type);
  }
}
