import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

import { Task } from './interfaces/task.interface';
import { GenericResponse } from '../../commons/responses/interfaces/generic-response';
import { PagedResponse } from '../../commons/responses/interfaces/paged-response';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get('/:id')
  async get(@Param('id') id: string): Promise<GenericResponse<Task>> {
    const task = await this.taskService.getTask(id);
    return {
      code: 0,
      description: 'Success',
      result: task,
    };
  }

  @Get('/')
  async getAll(): Promise<PagedResponse<Task[]>> {
    const tasks = await this.taskService.getTasks();
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

  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<GenericResponse<Task>> {
    const task = await this.taskService.createTask(createTaskDto);
    return {
      code: 0,
      description: 'Success',
      result: task,
    };
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<GenericResponse<Task>> {
    const task = await this.taskService.updateTask(id, createTaskDto);
    return {
      code: 0,
      description: 'Success',
      result: task,
    };
  }
}
