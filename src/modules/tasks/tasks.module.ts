import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { SharedModule } from '../../shared/shared.module';


@Module({
  imports:[SharedModule],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
