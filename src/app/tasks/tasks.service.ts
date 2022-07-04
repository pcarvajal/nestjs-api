import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Task } from './interfaces/task.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { GenericResponse } from '../../shared/responses/interfaces/generic-response';
import { PagedResponse } from '../../shared/responses/interfaces/paged-response';

@Injectable()
export class TasksService {
  constructor(@InjectModel('task') private taskModel: Model<Task>) {}

  async getTasks(): Promise<PagedResponse<Task[]>> {
    const tasks = await this.taskModel.find();
    if (!tasks)
      throw new HttpException('Tasks not found', HttpStatus.NOT_FOUND);
    return {
      code: 0,
      description: 'Success',
      pageNumber: 1,
      pageRecords: 1,
      totalPages: 1,
      totalRecords: 1,
      results: tasks,
    };
  }

  async getTask(taskId: string): Promise<GenericResponse<Task>> {
    const task = await this.taskModel.findById(taskId);
    if (!task)
      throw new HttpException('Task does not exist', HttpStatus.NOT_FOUND);
    return {
      code: 0,
      description: 'Success',
      result: task,
    };
  }

  async createTask(
    createTaskDto: CreateTaskDto,
  ): Promise<GenericResponse<Task>> {
    const task = new this.taskModel(createTaskDto);
    task.save();
    return {
      code: 0,
      description: 'Success',
      result: task,
    };
  }

  async deleteTaskById(taskId: string): Promise<GenericResponse<Task>> {
    const taskDeleted = await this.taskModel.findByIdAndDelete(taskId);
    if (!taskDeleted)
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    return {
      code: 0,
      description: 'Success',
      result: taskDeleted,
    };
  }

  async updateTask(
    taskId: string,
    createTaskDto: CreateTaskDto,
  ): Promise<GenericResponse<Task>> {
    const taskUpdated = await this.taskModel.findByIdAndUpdate(
      taskId,
      createTaskDto,
      {
        new: true,
      },
    );
    if (!taskUpdated)
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    return {
      code: 0,
      description: 'Success',
      result: taskUpdated,
    };
  }
}
