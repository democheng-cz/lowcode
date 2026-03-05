import type { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { User } from './user/entities/user.entity'

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'lowcode',
  entities: [User],
  synchronize: true,
}
