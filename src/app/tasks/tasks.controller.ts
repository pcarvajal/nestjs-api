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
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get('/:id')
  @ApiResponse({ status: 200, description: 'Success.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiResponse({ status: 500, description: 'Server error.' })
  async get(@Param('id') id: string): Promise<GenericResponse<Task>> {
    return await this.taskService.getTask(id);
  }

  @Get('/')
  @ApiResponse({ status: 200, description: 'Success.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiResponse({ status: 500, description: 'Server error.' })
  async getAll(
    @Query('page', ParseIntPipe) page: number,
  ): Promise<PagedResponse<Task[]>> {
    return await this.taskService.getTasks(page);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Created successfully' })
  @ApiResponse({ status: 500, description: 'Server error.' })
  async create(
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<GenericResponse<Task>> {
    return await this.taskService.createTask(createTaskDto);
  }

  @Put('/:id')
  @ApiResponse({ status: 200, description: 'Update successfully.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiResponse({ status: 500, description: 'Server error.' })
  async update(
    @Param('id') id: string,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<GenericResponse<Task>> {
    return await this.taskService.updateTask(id, createTaskDto);
  }

  @Delete('/:id')
  @ApiResponse({ status: 200, description: 'Delete successfully.' })
  @ApiResponse({ status: 500, description: 'Server error.' })
  async delete(@Param('id') id: string): Promise<GenericResponse<Task>> {
    return await this.taskService.deleteTaskById(id);
  }
}
