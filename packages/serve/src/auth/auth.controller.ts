import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: { username: string; password: string }) {
    return '';
  }

  @Post('register')
  register(@Body() body: { username: string; password: string }) {
    return '';
  }

  @Get('captcha')
  getCaptcha(@Query('type') type: 'login' | 'register') {
    return this.authService.getCaptcha(type);
  }
}
