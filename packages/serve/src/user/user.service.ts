import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    await this.userRepository.save(createUserDto);
    return {
      status: 200,
      message: '用户创建成功',
    };
  }

  async findAll() {
    return {
      status: 200,
      data: await this.userRepository.find({
        select: ['id', 'name', 'age', 'phone', 'password'],
      }),
    };
  }
}
