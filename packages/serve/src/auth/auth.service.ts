import { Injectable } from '@nestjs/common';
import { GenerateCaptcha } from '../utils/generateCaptcha';
import { RedisService } from '../commonModules/redis.service';
import { GenerateRandomTools } from '../utils/generateRandomTools';
import { SendCode } from '../utils/sendCode';
import { SecretTool } from '../utils/secretTool';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateAuthDto, LoginAuthDto } from './dto';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly generateCaptcha: GenerateCaptcha,
    private readonly redisService: RedisService,
    private readonly generateRandomTools: GenerateRandomTools,
    private readonly SendCodeTool: SendCode,
    private readonly SecretTool: SecretTool,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getCaptcha(type: 'login' | 'register') {
    const captcha = this.generateCaptcha.generateCaptcha();

    const captchaKey = `captcha:${type}:${captcha.text}`;
    await this.redisService
      .getClient()
      .set(captchaKey, captcha.text, 'EX', 60 * 120); // 5分钟过期

    return {
      captcha: captcha.data,
      captchaId: captcha.text,
    };
  }

  async sendCode(phone: string, type: 'login' | 'register') {
    const code = this.generateRandomTools.generateRandomCode();

    try {
      await this.SendCodeTool.sendCode(phone, code);
      const redisKey = `code:${type}:${phone}`;
      await this.redisService.getClient().set(redisKey, code, 'EX', 60 * 120); // 5分钟过期
      return {
        message: '验证码发送成功',
      };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  // 注册
  async register(createAuthDto: CreateAuthDto) {
    const { phone, code, captcha, type, password } = createAuthDto;

    // 从redis中获取图形验证码
    const redisCaptchaKey = `captcha:${type}:${captcha}`;
    const redisCaptchaCode = await this.redisService
      .getClient()
      .get(redisCaptchaKey);
    if (!redisCaptchaCode) throw new Error('图形验证码已过期');
    if (redisCaptchaCode !== captcha) throw new Error('图形验证码不正确');
    // 从redis中获取验证码
    const redisCodeKey = `code:${type}:${phone}`;
    const redisCode = await this.redisService.getClient().get(redisCodeKey);
    if (!redisCode) throw new Error('短信验证码已过期');
    if (redisCode !== code) throw new Error('短信验证码不正确');

    // 查找当前用户是否已经存在
    const user = await this.userRepository.findOne({
      where: {
        phone,
      },
    });
    if (user) throw new Error('用户已存在');

    // 创建用户
    const createUserDto: CreateUserDto = {
      name: this.generateRandomTools.generateRandomName(),
      age: 0,
      phone,
      password: this.SecretTool.encrypt(password),
    };
    // 去除createUserDto中的password
    const { password: omittedPassword, ...userData } = createUserDto;
    void omittedPassword;
    try {
      await this.userRepository.save(createUserDto);
      return {
        data: userData,
        message: '用户创建成功',
      };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  // 登录
  async login(loginAuthDto: LoginAuthDto) {
    const { phone, captcha, type, password } = loginAuthDto;

    // 从redis中获取图形验证码
    const redisCaptchaKey = `captcha:${type}:${captcha}`;
    const redisCaptchaCode = await this.redisService
      .getClient()
      .get(redisCaptchaKey);
    if (!redisCaptchaCode) throw new Error('图形验证码已过期');
    if (redisCaptchaCode !== captcha) throw new Error('图形验证码不正确');

    // 查找当前用户是否已经存在
    const user = await this.userRepository.findOne({
      where: {
        phone,
      },
    });
    if (!user) throw new Error('用户不存在');
    // 校验密码
    const secretPassword = this.SecretTool.encrypt(password);
    if (user.password !== secretPassword) throw new Error('密码不正确');

    return {
      message: '登录成功',
    };
  }
}
