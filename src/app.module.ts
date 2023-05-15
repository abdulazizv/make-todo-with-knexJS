import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    SharedModule,
    UsersModule,
    CacheModule.register({
      ttl: +process.env.TTL,
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
