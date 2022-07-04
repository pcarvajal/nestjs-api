import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { Task } from './schemas/task.schema';
import { GenericResponse } from '../../shared/interfaces/generic-response.interface';
import { PagedResponse } from '../../shared/interfaces/paged-response.interface';
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
  async getAll(
    @Query('page', ParseIntPipe) page: number,
  ): Promise<PagedResponse<Task[]>> {
    return await this.taskService.getTasks(page);
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
