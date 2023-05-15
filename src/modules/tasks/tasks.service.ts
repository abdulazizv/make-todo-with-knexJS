import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Knex } from 'knex';

@Injectable()
export class TasksService {
  constructor(@Inject('Knexconnection') private knex: Knex) {}

  async create(createTaskDto: CreateTaskDto) {
    return await this.knex('tasks').insert(createTaskDto).returning('*');
  }

  async findAll() {
    const allTasks = await this.knex('tasks').select('*');
    return allTasks;
  }

  async findOne(id: string) {
    const oneTask = await this.knex('tasks').where({task_id:id}).returning('*');
    if(!oneTask) {
      throw new HttpException(
        "ID is not found",
        HttpStatus.NOT_FOUND
      )
    }
    return oneTask;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const updatedTask = await this.knex('tasks').where({task_id:id}).update(updateTaskDto).returning('*');
    return updatedTask;
  }

  async remove(id: number) {
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
