import { IsIn } from 'class-validator';

export class GetCaptchaDto {
  @IsIn(['login', 'register'], { message: 'type类型必须是login或register' })
  type: 'login' | 'register';
}
