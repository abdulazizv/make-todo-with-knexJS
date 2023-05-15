import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Knex } from 'knex';
import { CACHE_MANAGER } from '@nestjs/cache-manager'; 
import { Cache } from 'cache-manager';
import { AuthService } from '../../shared/utils/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject('KnexConnection') private knex: Knex,
    readonly authService: AuthService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
