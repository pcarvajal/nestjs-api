import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Task } from './interfaces/task.interface';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel('task') private taskModel: Model<Task>) {}

  async getTasks(): Promise<Task[]> {
    return this.taskModel.find();
  }

  async getTask(taskId: string): Promise<Task> {
    return this.taskModel.findById(taskId);
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new this.taskModel(createTaskDto);
    return await task.save();
  }

  async deleteTaskById(taskId: string): Promise<Task> {
    return this.taskModel.findByIdAndDelete(taskId);
  }

  async updateTask(
    taskId: string,
    createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(taskId, createTaskDto, {
      new: true,
    });
  }
}
