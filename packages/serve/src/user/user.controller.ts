import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto, 'createUserDto');
    return this.userService.create(createUserDto);
  }
  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
