import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { Task } from './interfaces/task.interface';
import { GenericResponse } from '../../shared/responses/interfaces/generic-response';
import { PagedResponse } from '../../shared/responses/interfaces/paged-response';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get('/:id')
  async get(@Param('id') id: string): Promise<GenericResponse<Task>> {
    return await this.taskService.getTask(id);
  }

  @Get('/')
  async getAll(): Promise<PagedResponse<Task[]>> {
    return await this.taskService.getTasks();
  }

  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<GenericResponse<Task>> {
    return await this.taskService.createTask(createTaskDto);
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<GenericResponse<Task>> {
    return await this.taskService.updateTask(id, createTaskDto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<GenericResponse<Task>> {
    return await this.taskService.deleteTaskById(id);
  }
}
