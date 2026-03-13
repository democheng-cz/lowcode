import {
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
  MinLength,
  MaxLength,
  IsIn,
  Length,
} from 'class-validator';
export class CreateAuthDto {
  @IsNotEmpty({ message: '手机号不能为空' })
  @IsString({ message: '手机号必须是字符串' })
  @IsPhoneNumber('CN', { message: '手机号格式不正确' })
  phone: string;

  @IsNotEmpty({ message: '验证码不能为空' })
  @IsString({ message: '验证码必须是字符串' })
  @Length(4, 4, { message: '验证码长度必须为4位' })
  code: string;

  @IsNotEmpty({ message: '图形验证码不能为空' })
  @IsString({ message: '图形验证码必须是字符串' })
  @Length(4, 4, { message: '验证码长度必须为4位' })
  captcha: string;

  @IsNotEmpty({ message: '类型不能为空' })
  @IsString({ message: '类型必须是字符串' })
  @IsIn(['login', 'register'], { message: '类型必须是login或register' })
  type: 'login' | 'register';

  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码必须是字符串' })
  @MinLength(6, { message: '密码长度不能小于6位' })
  @MaxLength(16, { message: '密码长度不能大于16位' })
  password: string;

  @IsNotEmpty({ message: '确认密码不能为空' })
  confirmPassword: string;
}
