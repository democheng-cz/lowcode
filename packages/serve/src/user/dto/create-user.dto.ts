import {
  IsNotEmpty,
  IsInt,
  IsString,
  IsPhoneNumber,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名必须是字符串' })
  name: string;
  @IsNotEmpty({ message: '年龄不能为空' })
  @IsInt({ message: '年龄必须是整数' })
  age: number;
  @IsNotEmpty({ message: '手机号不能为空' })
  @IsString({ message: '手机号必须是字符串' })
  @IsPhoneNumber('CN', { message: '手机号格式不正确' })
  phone: string;
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码必须是字符串' })
  @MinLength(6, { message: '密码长度不能小于6位' })
  @MaxLength(16, { message: '密码长度不能大于16位' })
  password: string;
}
