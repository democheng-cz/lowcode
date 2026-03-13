import { IsNotEmpty, IsString, IsPhoneNumber, IsIn } from 'class-validator';
export class SendCodeDto {
  @IsNotEmpty({ message: '手机号不能为空' })
  @IsString({ message: '手机号必须是字符串' })
  @IsPhoneNumber('CN', { message: '手机号格式不正确' })
  phone: string;
  @IsIn(['login', 'register'], { message: '类型必须是login或register' })
  type: 'login' | 'register';
}
