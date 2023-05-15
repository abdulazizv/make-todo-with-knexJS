import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './modules/users/users.module';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SharedModule,
    UsersModule,
    TasksModule,
    CacheModule.register({
      ttl: +process.env.TTL,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
