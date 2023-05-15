import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SharedModule } from '../../shared/shared.module';
import { AuthModule } from '../../shared/utils/auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [SharedModule, AuthModule, CacheModule.register({ttl: +process.env.TTL})],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
