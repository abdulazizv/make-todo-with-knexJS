import { HttpException, Inject, Injectable,HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Knex } from 'knex';
import { CACHE_MANAGER } from '@nestjs/cache-manager'; 
import { Cache } from 'cache-manager';
import { AuthService } from '../../shared/utils/auth/auth.service';
import * as speakeasy from 'speakeasy';
import { verifyOtpDto } from './dto/verifyOtpDto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('KnexConnection') private knex: Knex,
    readonly authService: AuthService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async register(createUserDto: CreateUserDto) {
    const [check] = await this.knex('users').where({phone:createUserDto.phone}).returning('*');
    if (check) {
      throw new HttpException(
        "Phone number is already used",
        HttpStatus.EXPECTATION_FAILED
      )
    }
    const [user] = await this.knex('users').insert(createUserDto).returning('*');
    const otp = await this.generateOtp();
    await this.cacheManager.set(user.user_id,otp,120_000_0)
    return {
      message: "Otp code sent your phone number",
      code: otp
    }
  }

  async verify(verifyOtpDto: verifyOtpDto) {
    const [user] = await this.knex('users').where({phone:verifyOtpDto.phone}).returning('*')
    if(!user) {
      throw new HttpException(
        "User not found",
        HttpStatus.NOT_FOUND
      )
    };
    const otp = await this.cacheManager.get(user.user_id);
    if(otp != verifyOtpDto.otp) {
      console.log(otp,verifyOtpDto.otp);
      throw new HttpException(
        "Otp is not matched. Incorrect otp",
        HttpStatus.BAD_REQUEST
      )
    };
    return "OK";
  }
  async findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async generateOtp() {
    const secret = speakeasy.generateSecret({ length: 20 });
    const otp = speakeasy.totp({
      secret: secret.base32,
      encoding:'base32'
    });
    return otp;
  }
}
