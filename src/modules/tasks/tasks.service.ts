import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Knex } from 'knex';

@Injectable()
export class TasksService {
  constructor(@Inject('KnexConnection') private readonly knex: Knex) {}

  async create(createTaskDto: CreateTaskDto) {
    return await this.knex('tasks').insert(createTaskDto).returning('*');
  }

  async findAll() {
    const allTasks = await this.knex('tasks').innerJoin('users','tasks.user_id','users.user_id').select('*');
    return allTasks;
  }

  async findOne(id: string) {
    const oneTask = await this.knex('tasks').where({task_id:id}).innerJoin('users','tasks.user_id','users.user_id').returning('*');
    if(!oneTask) {
      throw new HttpException(
        "ID is not found",
        HttpStatus.NOT_FOUND
      )
    }
    return oneTask;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const updatedTask = await this.knex('tasks').where({task_id:id}).update(updateTaskDto).returning('*');
    return updatedTask;
  }

  async remove(id: string) {
    const check = await this.knex('tasks').where({task_id: id}).returning('*');
    if(!check) {
      throw new HttpException(
        "NOT found, ID is not found",
        HttpStatus.NOT_FOUND
      )
    };
    return check;
  }
}
