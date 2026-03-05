import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { GetUserIp, GetUserAgent } from '../utils/getUserMesTool';
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto, 'createUserDto');
    return this.userService.create(createUserDto);
  }
  @Get()
  findAll(@GetUserIp() ip: string, @GetUserAgent() agent: string) {
    console.log(ip, agent, 'ip, agent');
    return {
      ip,
      agent,
    };
  }
}
