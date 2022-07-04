import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { GenericResponse } from '../../shared/interfaces/generic-response.interface';
import { PagedResponse } from '../../shared/interfaces/paged-response.interface';
import { TasksRepository } from './tasks.repository';
import { ResponseCodes } from '../../shared/enum/response-codes.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TasksService {
  private readonly pageSize: number;

  constructor(
    private readonly taskRepository: TasksRepository,
    private readonly configService: ConfigService,
  ) {
    this.pageSize = +this.configService.get<number>('RESULTS_PAGE_SIZE');
  }

  async getTasks(page: number): Promise<PagedResponse<Task[]>> {
    const data = await this.taskRepository.pagedFind({}, page, this.pageSize);

    if (!data) throw new HttpException('Tasks not found', HttpStatus.NOT_FOUND);

    return {
      code: ResponseCodes.SuccessCode.valueOf(),
      description: ResponseCodes.SuccessDescription.valueOf(),
      pageNumber: page,
      pageRecords: data.documents.length,
      totalPages: Math.ceil(data.total / this.pageSize),
      totalRecords: data.total,
      results: data.documents,
    };
  }

  async getTask(taskId: string): Promise<GenericResponse<Task>> {
    const task = await this.taskRepository.findOne({ _id: taskId });
    if (!task)
      throw new HttpException('Task does not exist', HttpStatus.NOT_FOUND);
    return {
      code: ResponseCodes.SuccessCode.valueOf(),
      description: ResponseCodes.SuccessDescription.valueOf(),
      result: task,
    };
  }

  async createTask(
    createTaskDto: CreateTaskDto,
  ): Promise<GenericResponse<Task>> {
    const task = await this.taskRepository.create(createTaskDto);
    return {
      code: ResponseCodes.SuccessCode.valueOf(),
      description: ResponseCodes.SuccessDescription.valueOf(),
      result: task,
    };
  }

  async deleteTaskById(taskId: string): Promise<GenericResponse<Task>> {
    await this.taskRepository.deleteOne({ _id: taskId });
    return {
      code: ResponseCodes.SuccessCode.valueOf(),
      description: ResponseCodes.SuccessDescription.valueOf(),
    };
  }

  async updateTask(
    taskId: string,
    createTaskDto: CreateTaskDto,
  ): Promise<GenericResponse<Task>> {
    const taskUpdated = await this.taskRepository.findOneAndUpdate(
      { _id: taskId },
      createTaskDto,
    );
    if (!taskUpdated)
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    return {
      code: ResponseCodes.SuccessCode.valueOf(),
      description: ResponseCodes.SuccessDescription.valueOf(),
      result: taskUpdated,
    };
  }
}
